const router = require("express").Router();
const passport = require("passport")

//checking that whether the user is logged in or not by comaparing the sessions 
//from both : backend and frontend
router.get('/login/success', (req,res)=>{
    if(req.user){
        res.status(200).json({
            err: false,
            message: "Logged in successfully",
            user: req.user
        })
    }
    else{
        res.status(403).json({
            err: true,
            message: "Not Authorized"
        })
    }
    
})

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

//authenticate method called
router.get("/google",passport.authenticate("google",["profile","email"]))

//router method for the logout
router.get("/logout", (req,res)=>{

    //redirect to client url after logging out
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router