var db = require('../models');
var users = db.users;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var addUser = async (req,res)=>{

    if (req.details.email!="admin"){
        res.status(403).json({
            error:'not allowed'
        })
    }
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(req.body.password,salt);
    var exist = users.findOne({email:req.body.email})
    if(exist){
        res.status(403).json({
            Error:'Email Already Exists'
        })
    }
    var data = await users.create({
        password:password,
        eamil:req.body.email
    })
    res.status(200).json({
        status:'User Created'
    })
}

var login = async (req,res)=>{
    result = await users.findOne({email:req.body.email});
    if(!result){
        res.status(404).json({
            error:'email not found'
        })
    }
    var match = bcrypt.compareSync(req.body.password,result.password)
    if(match){
        var privateKey = process.env.privateKey;
        let params = {
            eamil:req.body.email
        }
        var token = await jwt.sign(params,privateKey,{expiresIn:'1d'})
        res.status(200).json({
            message:'logged in successfully',
            token:token
        })
    }
    else{
        res.status(404).json({
            error:'incorrect password'
        })
    }
}

module.exports = {
    login,
    addUser
}