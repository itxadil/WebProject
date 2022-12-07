const mongoose=require('mongoose')
const vetranSchema=new mongoose.Schema({
    photoUrl:String,
    name:String,
    email:String,
    profession:String,
    gender:String,
    password:String,
    followers:Array,
    following:Array,
    hobbies:Array,
    vetType:String,
    starcount:Number
})

const vertancollection=mongoose.model('veteran',vetranSchema)

module.exports=vertancollection