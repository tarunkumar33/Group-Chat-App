
exports.postMsgs=async(req,res,next)=>{    
    try{
        const result=await req.user.createMessage({msg:req.body.msg});
        res.json({result,suc:true});
    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}