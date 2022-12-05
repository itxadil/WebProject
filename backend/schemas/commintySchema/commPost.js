const mongoose=require('mongoose')
const cpostSchema=new mongoose.Schema({
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

const cpostCollections=mongoose.model('cpost',cpostSchema)

module.exports=cpostCollections