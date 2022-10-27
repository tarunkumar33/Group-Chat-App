const User=require('../models/user');
const bcrypt=require('bcrypt');

function isStringInvalid(string){
    if(string==undefined || string.length===0){
        return true;
    }
    return false;
}

exports.loginUser=async (req,res,next)=>{
    try{
        const result=await User.findAll({where:{email:req.body.email}});
        if(result.length===0){
            console.log('User Not Exists');
            res.status(404).json({success:false,message:'User Not Exists'});
        }
        else{
            bcrypt.compare(req.body.password,result[0].password,(err,bcryptRes)=>{
                if(bcryptRes){
                    // console.log("hi..........",result[0].id);
                    res.json({success:true,message:'User Successfully Loggedin'});
                }
                else{
                    console.log('password Incorrect');
                    res.status(401).json({success:false,message:'Password Incorrect'});
                }
            })
        } 
    }
    catch(err){
        res.status(500).json(err);
    }
}
exports.signupUser=async (req,res,next)=>{
    try{
        // console.log("hi.........",req.body);
        const {name,email,phoneNumber,password}=req.body;
        if(isStringInvalid(name)||isStringInvalid(email)||isStringInvalid(password)||isStringInvalid(phoneNumber)){
            return res.status(400).json({err:"Bad parameters, something is missing"});
        }
        if(await User.findOne({where:{email:email}})){
            return res.status(200).json({success:false,message:"User Already Exists, Please Login"});
        }
        const saltRounds=10;
        bcrypt.hash(password,saltRounds,async (err,hash)=>{
            try{
                const result=await User.create({name,email,phoneNumber,password:hash});
                res.status(201).json({success:true,message:'Successfully Signed Up',result});
            }
            catch(err){
                res.status(500).json(err);
            }
        });
    }
    catch(err){
        res.status(500).json(err);
    }
}
