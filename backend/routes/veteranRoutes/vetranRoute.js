const express=require('express')
const vertancollection=require('../../schemas/veteranScehma/veteranprofile')
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

veteranRouter.delete('/veteran/post/:email',async(req,res)=>{
    await vpostCollections.findOne({email:req.params.email})
    res.send('!deleted')
})

veteranRouter.get('/veteran/addFriend/:useremail/:email',async(req,res)=>{
    const following=await vertancollection.findOne({email:req.params.email})
    const user=await vertancollection.findOneAndUpdate({email:req.params.useremail},{ $push: { following: req.params.email} })
    user.save()
    console.log("USER",user)
    console.log("following",following)
    res.send(user)
})

veteranRouter.get('/veteran/removeFriend/:useremail/:email',async(req,res)=>{
    const following1=await vertancollection.findOne({email:req.params.email})
    const user=await vertancollection.findOneAndUpdate({email:req.params.useremail},{ $pull: { following: req.params.email} })
    user.save()
    console.log("USER",user)
    console.log("following",following1)
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




module.exports=veteranRouter