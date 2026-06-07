"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOrphanedFilesCleanup = runOrphanedFilesCleanup;
exports.startCleanupService = startCleanupService;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Invitation_1 = require("../models/Invitation");
const UPLOAD_DIR = path_1.default.join(process.cwd(), 'uploads');
const CLEANUP_INTERVAL = 12 * 60 * 60 * 1000; // Run every 12 hours
async function runOrphanedFilesCleanup() {
    console.log('[Cleanup Service] Starting orphaned files scan...');
    try {
        // 1. Ensure uploads directory exists
        if (!fs_1.default.existsSync(UPLOAD_DIR)) {
            console.log('[Cleanup Service] Uploads directory does not exist. Skipping.');
            return;
        }
        // 2. Read files in upload directory
        const files = await fs_1.default.promises.readdir(UPLOAD_DIR);
        if (files.length === 0) {
            console.log('[Cleanup Service] No files found in uploads directory.');
            return;
        }
        // 3. Get all active images referenced in DB
        // Since images are stored as relative URLs or filenames, we will extract their basenames
        const invitations = await Invitation_1.Invitation.find({}, 'image');
        const activeFiles = new Set();
        invitations.forEach((inv) => {
            if (inv.image) {
                // Extract filename from path or URL
                const filename = path_1.default.basename(inv.image);
                activeFiles.add(filename);
            }
        });
        console.log(`[Cleanup Service] Found ${activeFiles.size} active image references in database.`);
        // 4. Find orphaned files and delete them if they are older than 1 hour
        let deletedCount = 0;
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        for (const file of files) {
            // Skip hidden files or directories
            if (file.startsWith('.'))
                continue;
            if (!activeFiles.has(file)) {
                const filePath = path_1.default.join(UPLOAD_DIR, file);
                const stats = await fs_1.default.promises.stat(filePath);
                // Check if file is older than 1 hour (so we don't delete files in middle of creation)
                if (stats.mtimeMs < oneHourAgo) {
                    await fs_1.default.promises.unlink(filePath);
                    deletedCount++;
                    console.log(`[Cleanup Service] Deleted orphaned file: ${file}`);
                }
            }
        }
        console.log(`[Cleanup Service] Cleaned up ${deletedCount} orphaned file(s).`);
    }
    catch (error) {
        console.error('[Cleanup Service] Error during cleanup:', error);
    }
}
function startCleanupService() {
    console.log('[Cleanup Service] Initializing cleanup scheduler...');
    // Run first check 1 minute after server start
    setTimeout(() => {
        runOrphanedFilesCleanup();
    }, 60 * 1000);
    // Set interval to run every 12 hours
    setInterval(() => {
        runOrphanedFilesCleanup();
    }, CLEANUP_INTERVAL);
}
