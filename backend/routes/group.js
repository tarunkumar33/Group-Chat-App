const express=require('express');
const router=express.Router();
const grpControllers=require('../controllers/group');
const adminGrpControllers=require('../controllers/groupAdmin');
const authMiddleware=require('../middlewares/auth');
const adminMiddleware=require('../middlewares/admin');

router.post('/create-group',authMiddleware.authenticate,grpControllers.createGrp);
router.get('/get-groups',authMiddleware.authenticate,grpControllers.getGrps);
router.get('/group-members/:groupId',authMiddleware.authenticate,grpControllers.getGrpMembers);

router.post('/add-member/:groupId',authMiddleware.authenticate,adminMiddleware.adminCheck,adminGrpControllers.addMember);
router.post('/make-admin/:groupId',authMiddleware.authenticate,adminMiddleware.adminCheck,adminGrpControllers.makeAdmin);
router.post('/remove-member/:groupId',authMiddleware.authenticate,adminMiddleware.adminCheck,adminGrpControllers.removeMember);

router.get('/group-msgs/:groupId',authMiddleware.authenticate,grpControllers.getMessages);
router.post('/grpmsg/:groupId',authMiddleware.authenticate,grpControllers.postMessage);


module.exports=router;