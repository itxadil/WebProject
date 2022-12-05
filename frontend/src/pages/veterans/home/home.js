import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import photo1 from "../../../assets/images/img.png"
import { Player } from 'video-react';
import photo2 from "../../../assets/images/dummyImg.jpg"

import "./home.css"
var allpostsList=[]
var unfollowed=[]

var filteredList=[] 
var followedList=[]
function VHome(props){
  const history=useHistory()
    const [data,setData]=useState([])
    const [userData,setUserData]=useState({})
    const [Index,setIndex]=useState(0)
    const [posts,setPosts]=useState([])
    const [newarr,setNewArr]=useState([])
    console.log("Email",window.localStorage.getItem('userEmail'))
   useEffect(()=>{
    const getdata=async()=>{
      const user=window.localStorage.getItem('userEmail')
        const response=await axios.get(`http://localhost:4300/veteran/${user}`)
        console.log("rsp", response.data)
        setData(response.data)
        setUserData(response.data)
        const allPosts=await axios.get('http://localhost:4300/posts')
        const allCPosts=await axios.get('http://localhost:4300/cposts')
        console.log("allcposts",allCPosts.data.sort(sortFunction))
        console.log('allpostsss',allPosts.data.sort(sortFunction))
        allPosts.data.map((item)=>{
          if(item.email!==window.localStorage.getItem('userEmail')){
            allpostsList.push(item)
          }
        })
        allCPosts?.data.map((item)=>{
            allpostsList.push(item)
        })
       allpostsList?.sort(sortFunction)
        setPosts(allPosts.data)
       
    }

    getdata()
   },[])
   allpostsList.map((item)=>{
    console.log("item.email",item.email)
        filteredList.push(item)
  })

  console.log("FILTERED", filteredList)
  console.log("DAAAAA", data.following)
//  show posts of those ones who are followed by user
 let length=data?.following?.length
   filteredList.map((item,index)=>{
    for(let i=0;i<length; i++){
      if(data.following[i]==item?.email){
        followedList.push(item)
      }
    }
   })
   function sortFunction(a,b){  
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;  
   };




   const onfocus=()=>{
    history.push({
      pathname:'/onMind',
      state:{detail:window.localStorage.getItem('userEmail')}
    })
   }
   const findF=()=>{
    history.push('/allveterans')
   }
   const findOr=()=>{
    history.push('/allorganizations')
   }
   const findEvents=()=>{
      history.push('/allevents')
   }
    return(
      <>
      <div id="vetLine">
        <h3>veteranMeet</h3>
        <form>
          <input type="search" placeholder="Search for people, organizations and events" />
        </form>
        <button onClick={findF}>Find Friends</button>
        <button onClick={findEvents}>Find Events</button>
        <button>Create event</button>
        <button onClick={findOr}>Join organization</button>
        <img id="user" src={userData.photoUrl} />
      </div>
      <div id="bodydiv">
           <div id="post">
            <img id="user1" src={userData.photoUrl} />
            <form>
                <input type="text" placeholder="What's on your mind" onFocus={onfocus} />
            </form>
           </div>
           <div style={{marginTop:'20px'}}>
            <button style={{width:'100px',height:'25px' , backgroundColor:'skyblue'}}>Add photos</button>
            <button style={{width:'100px',height:'25px' , backgroundColor:'skyblue', marginLeft:'20px'}}>Add videos</button>
           </div>
           {followedList.map((item,index)=>(
            <div style={{border:'2px solid black', backgroundColor:'silver', marginTop:'10px'}}>
           <div style={{display:'flex', flexDirection:'row', marginTop:'10px'}}>
           <img src={item.photoUrl} style={{width:'50px', height:'50px', borderRadius:'100%'}} />
               <div>
                  <h3 style={{marginLeft:'15px'}}>{item.userName}</h3>
                  <p style={{marginLeft:'15px'}}>{item.time}</p>
               </div>  
           </div>
           <div>
            <p style={{marginTop:'8px', fontSize:'18px', fontWeight:'bold'}}>{item.postContent}</p>
           </div>
          {item.postPhoto!=='' ? <img src={item.postPhoto} style={{width:'60%' ,height:'300px', marginTop:'10px', backgroundColor:'silver'}} /> :<video
          className="VideoInput_video"
          width="50%"
          height="150px"
          controls
          src={item.postVideo}
          style={{borderRadius:'10px', marginLeft:'20px', marginTop:'10px'}}
        /> }
           <div style={{display:'flex', flexDirection:'row', marginTop:'10px'}}>
            <button style={{width:'80px', border:'none', backgroundColor:'lightblue', color:'black'}} > 👍 like </button>
            <button style={{width:'80px', border:'none', backgroundColor:'lightblue', color:'black' ,marginLeft:'10px'}}> 💌 comment </button>
            <button style={{width:'80px', border:'none', backgroundColor:'lightblue', color:'black',marginLeft:'10px'}}> ↪️ share </button>
           </div>
           </div>
           ))}
           <hr></hr>
           
      </div>
      </>
    );
}

export default VHome