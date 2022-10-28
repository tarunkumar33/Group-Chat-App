const express=require('express');
const router=express.Router();
const msgControllers=require('../controllers/message');
const authMiddleware=require('../middlewares/auth');

router.post('/message',authMiddleware.authenticate,msgControllers.postMsg);
router.get('/getMessages',authMiddleware.authenticate,msgControllers.getMsgs);



module.exports=router;