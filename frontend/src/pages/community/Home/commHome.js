import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./commHome.css"
function CommHome(props){
  const history=useHistory()
    const [data,setData]=useState([])
    const [userData,setUserData]=useState({})
    const [Index,setIndex]=useState(0)
    const [posts,setPosts]=useState([])
    const [newarr,setNewArr]=useState([])
    console.log("Email",window.localStorage.getItem('orgEmail'))
   useEffect(()=>{
    const getdata=async()=>{
        const response=await axios.get(`http://localhost:4300/community/${window.localStorage.getItem('orgEmail')}`)
        console.log("rsp", response.data)
        setData(response.data)
        setUserData(response.data)
    }

    getdata()
   },[])
   function sortFunction(a,b){  
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;  
   };




   const onfocus=()=>{
    history.push({
      pathname:'/communityOnMind',
      state:{detail:window.localStorage.getItem('orgEmail')}
    })
   }
   const findF=()=>{
    history.push('/allveterans')
   }
   const createEvent=()=>{
    history.push('/communityevent')
   }
   const allvets=()=>{
    history.push('/communityvets')
   }
    return(
      <>
      <div id="vetLine1">
        <h3>veteranMeet</h3>
        <form>
          <input type="search" placeholder="Search for people, organizations and events" />
        </form>
        <button onClick={findF}>Find Followers</button>
        <button>All Events</button>
        <button onClick={createEvent}>Create event</button>
        <button onClick={allvets}>All veterans</button>
        <button>All community service</button>
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
           {posts.map((item,index)=>(
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
          {item.postPhoto!=='' ? <img src={item.postPhoto} style={{width:'100%' ,height:'300px', marginTop:'10px'}} /> :<video
          className="VideoInput_video"
          width="80%"
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

export default CommHome