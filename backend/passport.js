var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var passport = require("passport")

let GOOGLE_CLIENT_ID = "851750612107-m44hm0u85k4e4m7mefke2vaeo9a4rea2.apps.googleusercontent.com"
let GOOGLE_CLIENT_SECRET = "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"
let GITHUB_CLIENT_ID = "b0611d2d40b3f4e0853a"
let GITHUB_CLIENT_SECRET = "3bf3f9c09599bc1d0a5af3fc8da652bd16f4f025"

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
        // const company = {
        //     name: profile.displayname,
        //     avatar: profile.photos[0] 
        // }
        // create new use modal and then finally...

        // company.save();
//   }
  function(accessToken, refreshToken, profile, done) {
    //this is when you use the db
    console.log(profile);
    done(null, profile)
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