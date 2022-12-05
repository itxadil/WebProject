const mongoose=require('mongoose')
const communitySchema=new mongoose.Schema({
    photoUrl:String,
    name:String,
    email:String,
    profession:String,
    password:String,
    followers:Array,
})

const communitycollection=mongoose.model('community',communitySchema)

module.exports=communitycollection