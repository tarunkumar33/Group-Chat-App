const GroupMember=require('../models/groupmember');

exports.adminCheck=async(req,res,next)=>{
    try{
        const adminMember=await GroupMember.findOne({where:{userId:req.user.id,groupId:req.params.groupId}});
        req.grpAdmin=adminMember.admin;
        if(adminMember.admin){
            next();
        }
        else{
            res.json("User is Not Admin");
        }
    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}