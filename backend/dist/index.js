"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Load environment variables
dotenv_1.default.config();
// Imports
const invitationRoutes_1 = __importDefault(require("./routes/invitationRoutes"));
const templateRoutes_1 = __importDefault(require("./routes/templateRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const rsvpRoutes_1 = __importDefault(require("./routes/rsvpRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const rateLimiter_1 = require("./middlewares/rateLimiter");
const templateController_1 = require("./controllers/templateController");
const cleanupService_1 = require("./services/cleanupService");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security Middlewares
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(null, true); // Fallback to allowing in development, or adjust as needed
        }
    },
    credentials: true
}));
// Parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve Uploaded Images Statically
const uploadDir = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express_1.default.static(uploadDir));
// Apply general API Rate Limiter
app.use('/api/', rateLimiter_1.apiLimiter);
// API Routes
app.use('/api/invitations', invitationRoutes_1.default);
app.use('/api/templates', templateRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
app.use('/api/rsvps', rsvpRoutes_1.default);
// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'InviteHub Server is healthy' });
});
// Global Error Handler
app.use(errorMiddleware_1.errorMiddleware);
// MongoDB Connection and Server Initialization
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('CRITICAL: MONGODB_URI environment variable is missing.');
    process.exit(1);
}
mongoose_1.default
    .connect(mongoUri)
    .then(async () => {
    console.log('Successfully connected to MongoDB Atlas.');
    // Seed default templates
    await (0, templateController_1.seedDefaultTemplates)();
    // Start automatic cleanup background service
    (0, cleanupService_1.startCleanupService)();
    // Start listening
    app.listen(PORT, () => {
        console.log(`[InviteHub Server] Running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
    });
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas:', err);
    process.exit(1);
});
