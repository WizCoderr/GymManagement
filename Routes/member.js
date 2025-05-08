import express from 'express';
import auth from '../DBConn/Auth/auth.js';
import { 
    getAllMember,
    registerMember,
    searchMember,
    monthlyMember,
    expiringWithin3Days,
    expiringWithIn4To7Days,
    expiredMember,
    inActiveMember,
    getMemberDetails,
    changeStatus,
    updateMemberPlan
} from '../Controllers/member.js';

const router = express.Router();

router.get('/all-member', auth, getAllMember);
router.post('/register-member', auth, registerMember);
router.get('/searched-members', auth, searchMember);
router.get('/monthly-member', auth, monthlyMember);
router.get('/within-3-days-expiring', auth, expiringWithin3Days);
router.get('/within-4-7-expiring', auth, expiringWithIn4To7Days);
router.get('/expired-member', auth, expiredMember);
router.get('/inactive-member', auth, inActiveMember);
router.get('/get-member/:id', auth, getMemberDetails);
router.post('/change-status/:id', auth, changeStatus);
router.put('/update-member-plan/:id', auth, updateMemberPlan);

export default router;