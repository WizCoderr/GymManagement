import { Router } from "express";
const router = Router();
import { createBatch, getAllBatches, addMembersToBatch, searchBatches, getBatchMembers } from '../Controllers/batch.js';
import auth from '../DBConn/Auth/auth.js';

router.post('/create-batch', auth, createBatch);
router.get('/get-batches', auth, getAllBatches);
router.post('/add-members-to-batch', auth, addMembersToBatch);
router.get('/searched-batches/:id', auth, searchBatches);
router.get('/:batchId/members', auth, getBatchMembers);
export default router;