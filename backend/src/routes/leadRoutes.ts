import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from '../controllers/leadController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// All lead routes require authentication
router.use(protect);

router.get('/export', exportLeadsCSV);

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id')
  .get(getLeadById)
  .put(updateLead)
  // Only Admins can delete leads (Role-Based Access Control)
  .delete(authorize('Admin'), deleteLead);

export default router;
