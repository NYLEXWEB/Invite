import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController';

const router = Router();

// GET: Retrieve views and device/country breakdowns
router.get('/', getAnalytics);

export default router;
