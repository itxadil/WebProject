const mongoose=require('mongoose')
const eventSchema=new mongoose.Schema({
    name:String,
    topic:String,
    address:String,
    category:String,
    contact:String,
    date:String,
    time:String,
    organization:String,
    stars:Number,
    interested:Array,
    invited:Array
})

const eventsCollection=mongoose.model('event',eventSchema)
module.exports=eventsCollection