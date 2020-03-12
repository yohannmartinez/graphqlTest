const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const organisationSchema = new Schema({
    name: String,
    population: Number,
});

module.exports = mongoose.model('Organisation',organisationSchema)