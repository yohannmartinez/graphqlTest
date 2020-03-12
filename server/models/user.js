const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    age: Number,
    sexe: String,
    phone: String,
    profileImageUrl: String,
    organisationId: String
});

module.exports = mongoose.model('User',userSchema)