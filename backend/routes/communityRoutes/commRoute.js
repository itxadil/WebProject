const express=require('express')
const cpostCollections = require('../../schemas/commintySchema/commPost')
const commRouter=express.Router()
const communitycollection=require('../../schemas/commintySchema/communitySchema')
const eventsCollection = require('../../schemas/commintySchema/eventSchema')
const vpostCollections=require('../../schemas/veteranScehma/VpostSchema')
commRouter.post('/community', async(req,res)=>{
    const response=new communitycollection(req.body)
    response.save()
    console.log(response)
    res.send(response)
})

commRouter.get('/community', async(req,res)=>{
    const response=await communitycollection.find()
    console.log(response)
    res.send(response)
})

commRouter.get('/community/:email', async(req,res)=>{
    const response=await communitycollection.findOne({email:req.params.email})
    res.send(response)
})

commRouter.post('/community/post', async(req,res)=>{
    const response= new cpostCollections(req.body)
    console.log(req.body)
    response.save()
    res.send(response)
})

commRouter.get('/cposts',async(req,res)=>{
    console.log("HIT")
    // const respose=await vertancollection.find()
    const response=await cpostCollections.aggregate([
        {
            $lookup:{
                from:"communities",
                localField:"email",
                foreignField:"email",
                pipeline: [ {
                    $sort: {
                        time: -1
                    }
                 } ],
                as: 'posts'
            }
        }
    ])
    const resList=[]
    console.log(response)
    response.map((item)=>{
        resList.push({
           userName:item.posts[0].name,
           email:item.posts[0].email,
           photoUrl:item.posts[0].photoUrl,
           postContent:item.post.content,
           postPhoto:item.post.photos,
           postVideo:item.post.videos,
           comments:item.post.comments,
           likes:item.post.likes,
           shares:item.post.shares,
           time:item.post.time
        })
    })
    res.send(resList)
})

commRouter.post('/postcommunityEvent',async(req,res)=>{
    const response=new eventsCollection(req.body)
    response.save()
    console.log(response)
    res.send(response)
})


commRouter.get('/Commevents/:organization/:email',async(req,res)=>{
    let resList=[]
    const response=await eventsCollection.find({organization:req.params.organization})
    const community=await communitycollection.findOne({email:req.params.email})
    response.map((item)=>{
        resList.push({
            name: item.name,
            topic: item.topic,
            address: item.address,
            category: item.category,
            contact: item.contact,
            date: item.date,
            time: item.time,
            organization: item.organization,
            stars: item.stars,
            interested: item.interested,
            photUrl:community.photoUrl
        })
    })
    console.log('response',response)
    res.send(resList)
})

commRouter.get('/events',async(req,res)=>{
    const response=await eventsCollection.aggregate([
        {
            $lookup:{
                from:"communities",
                localField:"organization",
                foreignField:"name",
                as: 'events'
            }
        }
    ])
    const resList=[]
    console.log(response)
    response.map((item)=>{
        resList.push({
           name:item?.name,
           topic:item?.topic,
           address:item?.address,
           category:item?.category,
           date:item?.date,
           time:item?.time,
           organization:item?.events[0]?.name,
           photoUrl:item?.events[0]?.photoUrl,
           interested:item.interested
        })
    })
    res.send(resList)
})

commRouter.get('/getmyevents/:organization',async(req,res)=>{
    console.log("HITTTT")
    const user=await eventsCollection.find({organizations:req.params.organization})
    console.log(user)
    res.send(user)
})


commRouter.get('/addEvent/:vet/:organization',async(req,res)=>{
    console.log("HITTTT")
    const user=await eventsCollection.findOneAndUpdate({name:req.params.organization},{ $push: { interested: req.params.vet} })
    console.log("USER",user)
    user.save()
    
    res.send(user)
})

commRouter.get('/removeEvent/:vet/:organization',async(req,res)=>{
    console.log("HITTTT")
    const user=await eventsCollection.findOneAndUpdate({name:req.params.organization},{ $pull: { interested: req.params.vet} })
    console.log("USER",user)
    user.save()
    
    res.send(user)
})





commRouter.get('/invite/:vet/:event',async(req,res)=>{
    console.log("HITTTT")
    const user=await eventsCollection.findOneAndUpdate({name:req.params.event},{ $push: { invited: req.params.vet} })
    console.log("USER",user)
    user.save()
    res.send(user)
})

commRouter.get('/removeinvite/:vet/:event',async(req,res)=>{
    console.log("HITTTT")
    const user=await eventsCollection.findOneAndUpdate({name:req.params.event},{ $pull: { invited: req.params.vet} })
    console.log("USER",user)
    user.save()
    
    res.send(user)
})




module.exports=commRouter