// import {msgabi} from './abi/message.json' 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
require("dotenv").config()
const cookieSession = require('cookie-session')
const cors = require("cors")
require("./passport");
const passport = require("passport")
const authRoute = require("./routes/auth")
const crypto = require('crypto');
const Company = require('./models/Company')
const User = require('./models/Data')
const app = express();


//this has to come here and at the top
app.use(
    cookieSession({
        name: "session",
        //it is used to encrypt the Cookie
        keys:["Metamap-website"],
        maxAge: 24*60*60*100 // one day of expiration
    })
)

//initializing passport.js library to use the cookie above
app.use(passport.initialize())


//using passport.js session  to control loggin in
app.use(passport.session())

//using the cors library to interact with the frontend
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, PUT, POST, DELETE",

    //allows us to send the sessions through our client-server request
    credentials: true
}))



// const jwt = require("jsonwebtoken")

//as we are using cookie sessions so we need to serialize or deserialize user to pass the session
passport.serializeUser((user, done)=>{
    done(null, user);
})
passport.deserializeUser((user, done)=>{
    done(null, user);
})


// const msgRoute = require('./routes/Messages')
const path = require('path');
mongoose.connect("mongodb://localhost:27017/metaversedb",{
    useNewUrlParser: true, useUnifiedTopology: true
})

//as now, callback is no longer accepted by connect method
mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.once('open', () => {
    console.log('Mongoose connected to database');
});

//if the data from the body comes in encoded or json format, we can deal with either of them
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/auth",authRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`port running on ${PORT}`)
})



var acc = null;

app.use(express.static(__dirname + './public'))    

app.post('/companydata', async (req,res)=>{
    let registered_user = User.find(req.user._json.email);
    let nm = req.body.nm;
    let type= req.body.type;
    let url = req.body.url;
    let bannerImg = req.body.bannerImg;
    let portfolioImg = req.body.portfolioImg;
    // let xCoor= req.body.x;
    let xCoor=011;
    // let yCoor = req.body.y;
    let yCoor = 137;
    let link = req.body.link;


    // Concatenate the input field values into a single string
    const inputFields = [nm, xCoor, yCoor].join('');

    // Hash the input string using SHA-256
    const hash = crypto.createHash('sha256').update(inputFields).digest('hex');

    // Convert the hash to an integer and take the modulo of 10^9
    const id = parseInt(hash, 16) % 1000000000;

    // Pad the ID with leading zeroes to ensure it has 9 digits
    const uniqueID = id.toString().padStart(9, '0');
    // let required_user = 
    var data = {
        "MCID" : uniqueID,
        "metaverseName" : nm,
        "metaverseType" : type,
        "metaverseBannerImg" : bannerImg,
        "metaverseImgPortfolio" : portfolioImg,
        "metaverseUrl" : url,
        "xCoordinate" : xCoor,
        "yCoordinate" : yCoor,
        "user" : registered_user._id,
        "openseaLink" : link,
    }
    console.log(data);
    if(await Company.find(data)){
        res.status(201).json({message: "Record already available"})
    }
    else{
        try{
            const newData = await Company.create({data});
            newData.save();
            res.status(201).json({message : "new record inserted successfully"})
        }catch(error){
            res.status(409).json({message : error.message})
        }
    }
    // try{
    //     const newData = await Company.create({data});
    //     newData.save();
    //     res.status(201).json({message : "new record inserted successfully"})
    // }catch(error){
    //     res.status(409).json({message : error.message})
    // }
})

app.post('/login', async(req,res) =>{

    //authentication logic
    const email = req.body.email;

    // //encoded version of the accesstoken to be generated
    // const accessToken = jwt.sign(req.body.name, process.env.ACCESS_SECRET_TOKEN)
    
    // //paassing accesstoken as json. accessToken will be having the user information inside of it
    // res.json({accessToken : accessToken});

})

//now, this function here is the middleware that will be checking for the authentication part 

app.get('/', (req, res) => {
    // const indexPath = path.join(__dirname, './index.html');
    // res.sendFile(indexPath);
    res.send("Hellow world");
});