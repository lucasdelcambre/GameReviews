const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    // Register a user to the database
    register: (req, res) => {
        const user = new User(req.body);
        user.save()
            .then((newUser) => {
                console.log(newUser);
                res.json({
                    successfulMessage: 'Thank you for registering.',
                    user: newUser
                })
            })
            .catch((err) => {
                console.log('Register failed.');
                console.log(err);
                res.status(400).json(err);
            })
    },

    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then((userRecord) => {
                if(userRecord === null){
                    // Email not found
                    res.status(400).json({message: 'Invalid login.'});
                }
                else {
                    // Email is found
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if(isPasswordValid){
                                res.cookie(
                                    'usertoken',
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            firstName: userRecord.firstName,
                                            lastName: userRecord.lastName,
                                        },
                                        process.env.JWT_SECRET,
                                    ),

                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000),
                                    }
                                ).json({
                                    message: 'Successfully logged in.',
                                    userLoggedIn: userRecord.firstName,
                                    userId: userRecord._id
                                })
                            }
                            else {
                                res.status(400).json({
                                    message: 'Login invalid.',
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({
                                message: 'Bad password.'
                            })
                        });
                }
            })
            .catch((err) => {
                console.log('error');
                res.status(400).json({message: 'Invalid attempt.'})
            });
    },

    // Log out user
    logout: (req, res) => {
        console.log('Logging out.');
        res.clearCookie('usertoken');
        res.json({
            message: 'Successfully logged out.',
        });
    },

    // Get one
    getOneUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .then((oneUser) => res.json(oneUser))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get all
    getAllUsers: (req, res) => {
        User.find({})
            .then((allUsers) => res.json(allUsers))
            .catch((err) => res.status(400).json(err));
    },

    deleteUser: (req, res) => {
        User.deleteOne({_id: req.params.id})
            .then((deletedUser) => res.json(deletedUser))
            .catch((err) => res.status(400).json(err))
    }
}