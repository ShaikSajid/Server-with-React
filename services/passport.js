const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const mongoose=require('mongoose');
const keys=require('../config/keys.js');
const User=mongoose.model('users');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(
    (id,done)=>{
        User.findById(id).then(user=>{
            done(null,user);
        });
    }
);


passport.use(
    new GoogleStrategy(
{
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
},
async (accessToken,refreshToken,profile,done)=>{

    const existingUser= User.findOne({googlId:profile.id})
        if(existingUser){
          console.log('user already exist...')  
          return done(null,existingUser);
        }
           const user=await new User({googlId:profile.id}).save(function (err) {if (err) return handleError(err);console.log('user inserted..')})
           done(null, user);
                
    
    

//console.log('accessToken :'+accessToken);
//console.log('refreshToken :',refreshToken);
//console.log('profile :',profile);
}
)
);