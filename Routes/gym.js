import { Router } from "express";
const router = Router();
import { register, login, sendOtp, checkOtp, resetPassword, logout } from '../Controllers/gym.js';



router.post('/register',register);
router.post('/login',login);
router.post('/reset-password/sendOtp',sendOtp);
router.post('/reset-password/checkOtp',checkOtp);
router.post('/reset-password',resetPassword);
router.post('/logout',logout);


export default router;