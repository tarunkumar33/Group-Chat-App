const Message=require('../models/message');

exports.postMsg=async(req,res,next)=>{    
    try{
        console.log('req.user:', req.user);
        const result=await req.user.createMessage({msg:req.body.msg,userName:req.user.name});
        res.json({result,suc:true,loginName:req.user.name});
    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}

exports.getMsgs=async(req,res,next)=>{
    try{
        console.log('req.user:', req.user);
        const result=await Message.findAll();
        console.log('result:', result);
        res.status(200).json({messages:result,success:true,loginName:req.user.name});
    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}