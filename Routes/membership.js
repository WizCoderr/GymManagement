import { Router } from "express";
const router = Router();
import { addMembership, getMembership } from '../Controllers/membership.js';
import auth from '../DBConn/Auth/auth.js';

 router.post('/add-membership', auth, addMembership)
 router.get('/get-membership',auth,getMembership)

 export default router;







