const express = require('express');
const router = express.Router();
userCtrl = require('../controllers/userController');
projectCtrl = require('../controllers/projectController')
var jwt = require('jsonwebtoken');

var authJwt = (req,res,next)=>{
    if(!req.headers.authorization){
        onsole.log(err);
            res.status(403).json({
                error:'not logged in'
            });
    }
    var token = req.headers.authorization.split(' ')[1];
    console.log(token);
    var privateKey = process.env.privateKey;
    jwt.verify(token,privateKey,function(err,decoded){
        if(err){
            console.log(err);
            res.status(403).json({
                error:'invalid token'
            });
        }
        else{
            console.log(decoded);
            req.details = decoded;
        }
    })
    next();

}
router.post('/addProject',authJwt,projectCtrl.addProject)
router.get('/login',userCtrl.login);
router.post('/addUser',userCtrl.addUser);

router.get('/admin',authJwt,(req,res)=>{
 
    res.status(200).json({
        status:'this is admin'
    })
})

module.exports = router;