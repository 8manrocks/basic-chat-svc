const serve = require('express');
const router = serve.Router();
const bcrypt = require('bcrypt');
const User = require('../schema/user-schema');
const jwt = require("jsonwebtoken");
const authenticateJwt = require('../middleware/jwtAuthenticator');


   //router.use(cors);

    router.post('/signUp', (req, res) => {
        try {
            const user = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email
            });
            User.findOne({username: req.body.username}).then(response => {
                if (response) {
                    return res.status(400).json({
                        message: 'User already exists'
                    })
                } else {
                    user.save().then(result => {
                        if (result) {
                            return res.status(200).json({
                                message: 'User Created'
                            });
                        } else {
                            return res.status(500).json({
                                message: 'Internal Server Error'
                            });
                        }
                    }).catch(err => {
                        console.log(err, 'err')
                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    });
                }
            }).catch(err => {
                console.log(err, 'err')
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            });
        } catch (error) {
            console.log(error, 'error')
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    });


    router.post('/logIn', (req, res) => {
        try {
            User.findOne({username: req.body.username}).then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        const token = jwt.sign({username: user.username, email: user.email}, 'secret_sauce', {expiresIn: '3600s'});
                        return res.status(200).json({
                            username: user.username,
                            token: token,
                            expiresIn: 3600,
                            message: 'User authenticated'
                        });
                    } else {
                        return res.status(400).json({
                            message: 'Invalid Credentials'
                        });
                    }
                } else {
                    return res.status(400).json({
                        message: 'Invalid Credentials'
                    });
                }
            }).catch(err => {
                console.log(err, 'err')
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            });
        } catch (error) {
            console.log(error, 'err')
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    });

    router.get('/refreshToken', authenticateJwt, (req, res) => {
        try {
                User.findOne({username: req.headers.username}).then(user => {
                    if (user) {
                            const token = jwt.sign({username: user.username, email: user.email}, 'secret_sauce', {expiresIn: '3600s'});
                            return res.status(200).json({
                                username: user.username,
                                token: token,
                                expiresIn: 3600,
                                message: 'Token refreshed'
                            });
                    } else {
                        return res.status(400).json({
                            message: 'Invalid request'
                        });
                    }
                }).catch(err => {
                    console.log(err, 'err')
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                });
            
        } catch (error) {
            console.log(error, 'err')
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    });

    router.get('/logOut', authenticateJwt, (req, res) => {
        try {
                User.findOne({username: req.headers.username}).then(user => {
                    if (user) {
                            return res.status(200).json({
                                username: user.username,
                                token: '',
                                expiresIn: 0,
                                message: 'User logged out'
                            });
                    } else {
                        return res.status(400).json({
                            message: 'Invalid request'
                        });
                    }
                }).catch(err => {
                    console.log(err, 'err')
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                });
            
        } catch (error) {
            console.log(error, 'err')
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    });

module.exports = router;
