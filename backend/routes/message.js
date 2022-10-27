const express=require('express');
const router=express.Router();
const msgControllers=require('../controllers/message');
const authMiddleware=require('../middlewares/auth');

router.post('/message',authMiddleware.authenticate,msgControllers.postMsgs);



module.exports=router;