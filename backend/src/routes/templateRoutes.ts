import { Router } from 'express';
import { getTemplates } from '../controllers/templateController';

const router = Router();

// GET: Retrieve list of active invitation templates
router.get('/', getTemplates);

export default router;
