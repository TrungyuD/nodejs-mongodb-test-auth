const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error : err
            })
        }

        let user = new User({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            password: hashedPass
        })
    
        user.save()
        .then(user => {
            res.json({
                message : 'User Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message : 'An error Occured!'
            })
        })
    })
}

const login = (req, res, next) => {
    let {username, password} = req.body;

    User.findOne({
        $or: [{email: username}, {phone: username}]
    })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({error: err})
                }
                if (result){
                    let token = jwt.sign({name: user.name}, 'secretValue', {expiresIn:'1h'})
                    res.json({
                        message: 'Login Successfully',
                        token
                    })
                } else {
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        } else {
            res.json({
                message: 'No user found!'
            })
        }
    })
}

module.exports = {
    register, login
}

