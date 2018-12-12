const express=require('express');
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const key=require('./config/keys');
require('./models/users');
require('./services/passport');

//const authRoutes=require('./routes/authRoutes');

mongoose.Promise=global.Promise;
mongoose.connect(key.mongooseURI,(err,client)=>{
    if(err){
        return console.log(err);
    }
    console.log('connected...')
});
   // mongoose.connect(key.mongooseURI,{useNewUrlParser: true});

const app=express();
app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[key.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//authRoutes(app); is equals to below
require('./routes/authRoutes')(app);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{console.log("server started at port"+PORT)});