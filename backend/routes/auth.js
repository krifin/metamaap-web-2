const router = require("express").Router();
const passport = require("passport")


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


//router method for the logout
router.get("/logout", (req,res)=>{

    //redirect to client url after logging out
    req.logout();
    res.redirect("http://localhost:3000/login")
})

module.exports = router