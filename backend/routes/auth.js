const router = require("express").Router();
const passport = require("passport")

//checking that whether the user is logged in or not by comaparing the sessions 
//from both : backend and frontend

//router route if the login system failed.
router.get('/login/failed', (req,res)=>{
    res.status(401).json({
        err: true,
        message: "Login Failure"
    })
})

//get api for the callback
router.get('/google/callback',
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed"
    })
)