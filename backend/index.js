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
const Company = require('./models/Data')
const app = express();






//this has to come here and at the top
app.use(
    cookieSession({
        name: "session",
        //can be anything... doesn't really matter, as its just a name
        keys:["Metamaap_website"],
        maxAge: 24*60*60*100 // one day of expiration
    })
)

//initializing passport.js library
app.use(passport.initialize())


//using passport.js session 
app.use(passport.session())

//using the cors library to interact with the frontend
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, PUT, POST, DELETE",

    //allows us to send the seesions through our client-server request
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

app.use(express.static('public'))    

app.post('/reg_user', async (req,res)=>{
    let name = req.body.name;
    let email= req.body.email;
    let phone = req.body.phone;
    let password= req.body.password;
    var data = {
        "name": name,
        "email" : email,
        "phone" : phone,
        "password":password
    }

    const company_email = await Company.findOne({email: req.body.email});
    if(company_email) return res.status(400).json({message:"Email Already registered!"})
    else{
        Company.create(data)
        .then(()=>{
            console.log('record inserted successfully')
            res.status(201).json({message:"user registered successfully"})
        })
        .catch((err)=>{
            res.status(422).json({message: "data not registered. Invalid!"})
        })
    }
    
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