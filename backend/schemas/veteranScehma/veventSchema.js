const mongoose=require('mongoose')
const veventSchema=new mongoose.Schema({
    name:String,
    topic:String,
    address:String,
    category:String,
    contact:String,
    date:String,
    time:String,
    stars:Number,
    organizer:String,
    interested:Array,
    invited:Array
})

const veventsCollection=mongoose.model('vevent',veventSchema)
module.exports=veventsCollection