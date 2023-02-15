const mongoose = require('mongoose');

const User = mongoose.model(
    'user',
    {
        first_name: String,
        last_name: String,
        email: String,
        birthday: Date,
        password: String
    },
    'users'
);

const create = async (data) => {
    let u = new User(data);
    return u.save();
};

const update = async (data) => {
    return User.updateOne(data);
};

const getUserByEmail = async (email) => {
    return User.findOne({email});
};

module.exports = {
    create,
    update,
    getUserByEmail
};