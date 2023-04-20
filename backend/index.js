// import {msgabi} from './abi/message.json' 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const Company = require('./models/Data')
const app = express();

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

    const company_email = await Company.findOne({name: req.body.email});
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


app.get('/', (req, res) => {
    // const indexPath = path.join(__dirname, './index.html');
    // res.sendFile(indexPath);
    res.send("Hellow world");
});