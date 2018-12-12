const mongoose=require('mongoose');

const {Schema}=mongoose;

const userSchema=new Schema({
    googlId:String
});

mongoose.model('users',userSchema);