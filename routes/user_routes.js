    const express = require('express')
const { User_modle } = require('../modules/users')
const user_router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
user_router.post('/register',async(req,res)=>{
    const {username , email ,pass} = req.body
    try{
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err){
                res.send({msg:err})
            }
            else{
                const new_user = new User_modle({username,email,pass:hash})
                await new_user.save()
                res.send({msg:"New user registered"})
            }
        });
    }
    catch(err){
        res.send({msg:err})
    }
})

user_router.post('/login',async(req,res)=>{
    const {email,pass} = req.body
    try{
        const user = await User_modle.findOne({email})
        if(!user){
            res.send({msg:"No user found"})
        }
        bcrypt.compare(pass, user.pass,(err, result)=> {
            if(result){
                const token = jwt.sign({userID:user._id,user:user.username},"masai")
                res.send({msg:"User logged in!","token":token})
            }
            else{
                res.send({msg:err})
            }
        });
    }
    catch(err){

    }
})

module.exports = {
    user_router
}