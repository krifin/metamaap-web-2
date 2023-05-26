const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
    MCID: {
        type: String,
        // required: true
    },  
    metaverseName: {
        type: String,
        // required: true,
      },
      metaverseType: {
        type: String,
        // required: true,
      },
      metaverseUrl: {
        type: String,
        // required: true,
        unique: true,
      },
      metaverseBannerImg : String,
      metaverseImgPortfolio : String,
      xCoordinate: {
        type: Number,
        // required: true
      },
      yCoordinate: {
        type: Number,
        // required: true
      },
      user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    //   zCoordinate:{
    //     type: Number,
    //     required: true
    //   },
      openseaLink: {
        type: String
      }
//doing timestamps: true will automatically manage created at an updated at fields
}, {timestamps: true})

const Company  = mongoose.model('Company', companySchema)
module.exports = Company 