const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
    name : {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String,
        required: true
    }
//doing timestamps: true will automatically manage created at an updated at fields
}, {timestamps: true})

const Company  = mongoose.model('companyData', companySchema)
module.exports = Company 