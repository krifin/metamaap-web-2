var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require("passport")
const User = require('./models/Data')

let GOOGLE_CLIENT_ID = "851750612107-m44hm0u85k4e4m7mefke2vaeo9a4rea2.apps.googleusercontent.com"
let GOOGLE_CLIENT_SECRET = "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"
let GITHUB_CLIENT_ID = "b0611d2d40b3f4e0853a"
let GITHUB_CLIENT_SECRET = "3bf3f9c09599bc1d0a5af3fc8da652bd16f4f025"
let FACEBOOK_CLIENT_ID = "766064028459763"
let FACEBOOK_CLIENT_SECRET = "0efd6a3dae74e78da0f0d0cd72e63361"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
  },

  //after authentication, its returning us the accessToken, refreshToken, profile and callback (cb) function
//   function(accessToken, refreshToken, profile, cb) {
//     //this is when you use some db (eg -> mongodb)
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });

        // if using the database
        
//   }
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    //this is when you use the db, create new use document and then finally saving it
    const user = {
      username: profile.displayName,
      email : profile.emails[0].value,
      password : "defaultpassword", 
    }
    // console.log(user);
    let reg_user = User.find(user);
    if(reg_user){
      done(null, profile)
    }else{
      User.Create(user);
      console.log("registration successful");
      done(null, profile)
    }
  }
));

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile)
  }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile)
  }
));