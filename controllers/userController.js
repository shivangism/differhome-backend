var db = require('../models');
var users = db.users;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var addUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(403).json({ error: "value missing" })
    }
    else {
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.password, salt);
        var exist = await users.findOne({ where: { username: req.body.email } })
        if (exist) {
            res.status(403).json({
                Error: 'Email Already Exists'
            })
        }
        else {
            var data = await users.create({
                password: password,
                username: req.body.email
            })
            res.status(200).json({
                status: 'User Created'
            })
        }
    }
}

var login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(403).json({ error: "value missing" })
    }
    else {
        var result = await users.findOne({ where: { username: req.body.email } });

        if (!result) {
            res.status(404).json({
                error: 'email not found'
            })
        }
        else {
            var match = bcrypt.compareSync(req.body.password, result.password)
            if (match) {
                var privateKey = process.env.privateKey;
                let params = {
                    email: req.body.email
                }
                var token = await jwt.sign(params, privateKey, { expiresIn: '1d' })
                res.status(200).json({
                    message: 'logged in successfully',
                    token: token
                })
            }
            else {
                res.status(404).json({
                    error: 'incorrect password'
                })
            }
        }
    }
}

module.exports = {
    login,
    addUser
}