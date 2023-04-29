const router = require("express").Router();
const passport = require("passport")
const Company = require('../models/Company')
const User = require('../models/Data')
const crypto = require('crypto')


//use the post method if we have the inputs in the frontend


//checking that whether the user is logged in or not by comaparing the sessions 
//from both : backend and frontend
router.get('/login/success', (req,res)=>{
    if(req.user){
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: req.user,
            cookies: req.cookies
        })
    }
    else{
        res.status(403).json({
            err: true,
            message: "Not Authorized"
        })
    }
    
})
router.post('/companydata', async(req,res)=>{
    console.log("req.user", req.user);
    if(req.user){
        let registered_user = User.find(req.user._json.email);
        let nm = req.body.nm;
        let type= req.body.type;
        let url = req.body.url;
        let bannerImg = req.body.convertedbannerImg;
        let portfolioImg = req.body.convertedportfolioImg;
        // let xCoor= req.body.x;
        // let yCoor = req.body.y;
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
            "xCoordinate" : 015,
            "yCoordinate" : 137,
            "user" : registered_user._id,
            "openseaLink" : link,
        }
        // const newData = await Company.create({data});
        // newData.save();
        // res.status(201).json({message : "again new record inserted successfully"})
        // console.log(data);
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
 
    }else{
        res.status(403).json({
            err: true,
            message: "Not Authorized"
        })
    }
})
//router route if the login system failed.
router.get('/login/failed', (req,res)=>{
    //401-> not authenticated
    res.status(401).json({
        err: true,
        message: "Login Failure"
    })
})

//get api for the callback
router.get('/google/callback',
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000/galaxy2",
        failureRedirect: "/login/failed"
    })
)

//authenticate method called
router.get("/google",passport.authenticate("google",["profile","email"]))


//get api for the callback
router.get('/github/callback',
    passport.authenticate("github", {
        successRedirect: "http://localhost:3000/galaxy2",
        failureRedirect: "/login/failed"
    })
)

//authenticate method called
router.get("/github",passport.authenticate("github",["profile","email"]))

//get api for the callback
router.get('/facebook/callback',
    passport.authenticate("facebook", {
        successRedirect: "http://localhost:3000/galaxy2",
        failureRedirect: "/login/failed"
    })
)

//authenticate method called
router.get("/facebook",passport.authenticate("facebook",["profile","email"]))


//router method for the logout
router.get("/logout", (req,res)=>{

    //redirect to client url after logging out
    req.logout();
    res.redirect("http://localhost:3000/login")
})

module.exports = router