const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyparser=require('body-parser')
const veteranRouter=require('./routes/veteranRoutes/vetranRoute')
const commRouter=require('./routes/communityRoutes/commRoute')
mongoose.connect('mongodb://localhost:27017/webproject');
const app=express()
app.use(cors())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyparser.urlencoded({extended:true,limit:'1000mb'}))
app.use(bodyparser.json({
    limit: '1000mb',
    parameterLimit: 100000
  }))

   app.use(bodyparser.raw({
    limit: '1000mb',
    inflate: true,
    parameterLimit: 100000
  }))
app.use(veteranRouter)
app.use(commRouter)
app.listen('4300',(req,res)=>{
    console.log("Server running on 4300")
})