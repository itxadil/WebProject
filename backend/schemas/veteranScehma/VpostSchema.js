const mongoose=require('mongoose')
const vpostSchema=new mongoose.Schema({
    email:String,
    post:{ 
        time : { type : Date, default: Date.now },
        content:String,
        photos:String,
        videos:String,
        comments:Array,
        likes:Array,
        shares:Array
    }
})

const vpostCollections=mongoose.model('vpost',vpostSchema)

module.exports=vpostCollections