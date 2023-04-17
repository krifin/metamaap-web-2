const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
    name : {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    }
    //source as of now commented as when will be integrating with web3 then the data will be coming
    //from the smart contract
    // source: {
    //     type: String
    // }
//doing timestamps: true will automatically manage created at an updated at fields
}, {timestamps: true})

const Message = mongoose.model('companyData', companySchema)
module.exports = Company 