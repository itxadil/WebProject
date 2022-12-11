const express=require('express')
const vertancollection=require('../../schemas/veteranScehma/veteranprofile')
const veventsCollection = require('../../schemas/veteranScehma/veventSchema')
const vpostCollections=require('../../schemas/veteranScehma/VpostSchema')
const veteranRouter=express.Router()

veteranRouter.post('/veteran',async(req,res)=>{
    const response=new vertancollection(req.body)
    response.save()
    res.send(response)
})
veteranRouter.get('/veteran',async(req,res)=>{
    const response=await vertancollection.find()
    res.send(response)
})

veteranRouter.get('/veteran/:email',async(req,res)=>{
    const response=await vertancollection.findOne({email:req.params.email})
    res.send(response)
})

veteranRouter.delete('/veteran/:id',async(req,res)=>{
    await vertancollection.findByIdAndDelete({_id:req.params.id})
    res.send('!deleted')
})

veteranRouter.patch('/veteran/:id',async(req,res)=>{
   const data= await vertancollection.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    res.send(data)
})


veteranRouter.delete('/veteran/post/:email',async(req,res)=>{
    await vpostCollections.findOne({email:req.params.email})
    res.send('!deleted')
})

veteranRouter.get('/veteran/addFriend/:useremail/:email',async(req,res)=>{
    const following=await vertancollection.findOne({email:req.params.email})
    const user=await vertancollection.findOneAndUpdate({email:req.params.useremail},{ $push: { following: req.params.email} })
    user.save()
    // console.log("USER",user)
    // console.log("following",following)
    res.send(user)
})

veteranRouter.get('/veteran/removeFriend/:useremail/:email',async(req,res)=>{
    const following1=await vertancollection.findOne({email:req.params.email})
    const user=await vertancollection.findOneAndUpdate({email:req.params.useremail},{ $pull: { following: req.params.email} })
    user.save()
    res.send(user)
})

veteranRouter.get('/posts',async(req,res)=>{
    // const respose=await vertancollection.find()
    const response=await vpostCollections.aggregate([
        {
            $lookup:{
                from:"veterans",
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
           userName:item.posts[0]?.name,
           photoUrl:item.posts[0]?.photoUrl,
           email:item.posts[0]?.email,
           postContent:item?.post?.content,
           postPhoto:item?.post?.photos,
           postVideo:item?.post?.videos,
           comments:item?.post?.comments,
           likes:item?.post?.likes,
           shares:item?.post?.shares,
           time:item?.post?.time
        })
    })
    res.send(resList)
})

veteranRouter.post('/veteran/post',async(req,res)=>{
    const response= new vpostCollections(req.body)
    console.log(req.body)
    response.save()
    res.send(response)
})

veteranRouter.post('/postevent',async(req,res)=>{
    const response= new veventsCollection(req.body)
    console.log(req.body)
    response.save()
    res.send(response)
})

veteranRouter.get('/vevents/:user',async(req,res)=>{
    let resList=[]
    const response=await vertancollection.findOne({email:req.params.user})
    const community=await veventsCollection.find({organizer:req.params.user})
    community.map((item)=>{
        resList.push({
            name: item.name,
            topic: item.topic,
            address: item.address,
            category: item.category,
            contact: item.contact,
            date: item.date,
            time: item.time,
            organizer: item.organizer,
            stars: item.stars,
            interested: item.interested,
            photUrl:response.photoUrl
        })
    })
    console.log('response',community)
    res.send(resList)
})


veteranRouter.get('/vinvite/:vet/:event',async(req,res)=>{
    console.log("HITTTT")
    const user=await veventsCollection.findOneAndUpdate({name:req.params.event},{ $push: { invited: req.params.vet} })
    console.log("USER",user)
    user.save()
    res.send(user)
})

veteranRouter.get('/vremoveinvite/:vet/:event',async(req,res)=>{
    console.log("HITTTT")
    const user=await veventsCollection.findOneAndUpdate({name:req.params.event},{ $pull: { invited: req.params.vet} })
    console.log("USER",user)
    user.save()
    
    res.send(user)
})

veteranRouter.get('/getevents/:name',async(req,res)=>{
    console.log("HITTTT")
    const user=await veventsCollection.find({name:req.params.name})
    console.log(user)
    res.send(user)
})

veteranRouter.get('/getvevents/:user',async(req,res)=>{
    const allE=[]
    const response=await veventsCollection.aggregate([
        {
            $lookup:{
                from:"veterans",
                localField:"organizer",
                foreignField:"email",
                pipeline: [ {
                    $sort: {
                        time: -1
                    }
                 } ],
                as: 'allEvents'
            }
        }
    ])
    response.map((item)=>{
        allE.push({
            _id: item._id,
            eventname: item.name,
            topic: item.topic,
            address: item.address,
            category: item.category,
            contact: item.contact,
            date: item.date,
            time: item.time,
            stars: item.stars,
            organizer: item.organizer,
            interested: item.interested,
            invited: item.invited,
            photoUrl:item.allEvents[0].photoUrl,
            name:item.allEvents[0].name
        })
    })
    // const response=await veventsCollection.find()
    
    const user=await vertancollection.findOne({email:req.params.user})
    let resLIst=[]
    allE.map((item)=>{
        if(user.email!==item.organizer){
            console.log(user.email)
            resLIst.push(item)
        }
    })
    let matchHobbies=[]
    resLIst.map((item)=>{
        for(let i=0;i< user.hobbies.length;i++){
            if(user.hobbies[i]===item.category){
                console.log(user.hobbies[i])
                matchHobbies.push(item)
            }
        }
    })
    res.send(matchHobbies)
})

veteranRouter.get('/vovadd/:vet/:event',async(req,res)=>{
    // console.log("HITTTT")
    const user=await veventsCollection.findOneAndUpdate({name:req.params.event},{ $push: { interested: req.params.vet} })
    // console.log("USER",user)
    user.save()
    res.send(user)
})

veteranRouter.get('/vovdel/:vet/:event',async(req,res)=>{
    console.log("HITTTT")
    const user=await veventsCollection.findOneAndUpdate({name:req.params.event},{ $pull: { interested: req.params.vet} })
    console.log("USER",user)
    user.save()
    
    res.send(user)
})

veteranRouter.get('/getevents/:name',async(req,res)=>{
    console.log("HITTTT")
    const user=await veventsCollection.find({name:req.params.name})
    console.log(user)
    res.send(user)
})

veteranRouter.get('/addstars/:email',async(req,res)=>{
    const user=await vertancollection.findOne({email:req.params.email})
    console.log("HIT LIKE")
    user.starcount+=1000
    const newdata=await vertancollection.findByIdAndUpdate({_id:user._id},{starcount:user.starcount},{new:true})
    console.log("newdata",newdata)
    newdata.save()
})

veteranRouter.get('/reducestars/:email',async(req,res)=>{
    const user=await vertancollection.findOne({email:req.params.email})
    user.starcount-=1000
    const newdata=await vertancollection.findByIdAndUpdate({_id:user._id},{starcount:user.starcount},{new:true})
    newdata.save()
    res.send(newdata)
})

veteranRouter.get('/getinvites/:email',async(req,res)=>{
    const user =await veventsCollection.find()
    console.log("user",user)
    var invited=[]
    user.map((item)=>{
        if(item.invited.includes(req.params.email)){
            invited.push(item)
        }
    })
    res.send(invited)
})

veteranRouter.get('/accepted/:event/:email',async(req,res)=>{
  console.log("HITT")
   await veventsCollection.findOneAndUpdate({name:req.params.event},{$push:{interested:req.params.email}})
    console.log("HIT LIKE")
    const response=await vertancollection.findOne({email:req.params.email})
    response.starcount+=1000
    const newdata=await vertancollection.findByIdAndUpdate({_id:response._id},{starcount:response.starcount},{new:true})
    console.log("newdata",newdata)
    newdata.save()
    res.send(newdata)
})

veteranRouter.get('/rejected/:event/:email',async(req,res)=>{
    const user=await veventsCollection.findOneAndUpdate({name:req.params.event},{$pull:{interested:req.params.email}})
    console.log("HIT LIKE")
    const response=await vertancollection.findOne({email:req.params.email})
    response.starcount-=1000
    const newdata=await vertancollection.findByIdAndUpdate({_id:response._id},{starcount:response.starcount},{new:true})
    console.log("newdata",newdata)
    newdata.save()
    res.send(newdata)
})

// veteranRouter.post('/addcomment/:email/:user',async(req,res)=>{
//     const payload={
//         email:req.params.user,
//         content:req.body.comment
//     }
//     console.log(payload)
//     const user=await vpostCollections.findOne({email:req.params.email})
//     const newdata=await vpostCollections.findByIdAndUpdate({_id:user._id},{$push:{comments:payload}},{new:true})
//     newdata.save()
//     res.send(newdata)
// })


module.exports=veteranRouter