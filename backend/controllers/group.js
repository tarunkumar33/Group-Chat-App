
const uuid=require('uuid');
const Group=require('../models/group');
const GroupMember=require('../models/groupmember');
const User=require('../models/user');
const GroupMessage=require('../models/groupmessage');

exports.createGrp=async(req,res,next)=>{
    try{
        const group=await req.user.createGroup({id:uuid.v4(),groupName:req.body.groupName});
        console.log('group:', group)
        const result=await group.addUser(req.user,{through:{admin:true,groupName:req.body.groupName}});
        console.log('result:', result)
        res.status(201).json(group);
    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}

exports.getGrps=async(req,res,next)=>{
    try{
        const grps=await GroupMember.findAll({where:{userId:req.user.id}});
        res.status(200).json(grps);
    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}

exports.getGrpMembers=async(req,res,next)=>{
    try{
        const group=await Group.findOne({where:{id:req.params.groupId}});
        const groupMems=await group.getUsers();
        console.log('groupMems:', groupMems)
        res.json(groupMems);
    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}

exports.getMessages=async(req,res,next)=>{
    try{
        const group=await Group.findOne({where:{id:req.params.groupId}});
        console.log('group:', group)
        const result= await group.getGroupmessages({include:User});
        console.log('result:', result)
        res.json({messages:result,loginName:req.user.name});
    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}

exports.postMessage=async(req,res,next)=>{
    try{
        const result= await GroupMessage.create({msg:req.body.msg,userId:req.user.id,groupId:req.params.groupId});
        console.log('result:', result)
        res.json(result);

    }
    catch(err){
        console.log('err:', err)
        res.status(500).json(err);
    }
}

