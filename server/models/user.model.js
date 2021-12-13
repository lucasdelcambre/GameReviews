const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.'],
        minLength: [3, 'First name must be at least 3 characters.']
    },

    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
        minLength: [3, 'Last name must be at least 3 characters.']
    },

    email: {
        type: String,
        required: [true, 'Email is required.']
    },

    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [4, 'Password must be at least 4 characters.']
    }
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords must match.')
    }

    next();
});

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        })
});

const User = mongoose.model('User', UserSchema);

module.exports = User;