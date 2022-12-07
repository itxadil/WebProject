import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./allevents.css"
var following=[]
var onlyfollowing=[]
function AllEvents(){
    const history=useHistory()
    const [events,setEvents]=useState([])
    const [updatedUser,setUpdatedUser]=useState([])
    const [flag,setFlag]=useState(false)
    const [beforeup,setBeforeup]=useState([])
    function checkown(age) {
        return age !== window.localStorage.getItem('userEmail');
      }
    useEffect(()=>{
        const getVeterans=async()=>{
        const user=window.localStorage.getItem('userEmail')
          const response=await axios.get('http://localhost:4300/events')
          const userInfo=await axios.get(`http://localhost:4300/veteran/${user}`)
          const allEv=await axios.get(`http://localhost:4300/getvevents/${user}`)
          response.data.map((item)=>{
            if(userInfo?.data?.hobbies.includes((item.category))){
                onlyfollowing.push(item)
            }
          })
          response.data.map((item)=>{
            item.interested.forEach((item1)=>{
                following.push(item1)
            })
          })
        //   response.data?.interested.forEach((item)=>{
            
        //   })
        // allEv.data.map((item)=>{
        //     onlyfollowing.push(item)
        // })
          console.log("FOLLO",following)
          const user1=await axios.get(`http://localhost:4300/veteran/${user}`)
          setBeforeup(user1.data)
        }
        getVeterans()
    },[])
    if(following.includes(window.localStorage.getItem('userEmail'))){
        console.log()
    }
    const myevents=()=>{
        history.push('/getmyevents')
    }
    const ovevents=()=>{
        history.push('ovevents')
    }
    const onLike=async(e)=>{
        const user=window.localStorage.getItem('userEmail')
        console.log("USSS",user)
        console.log("FOL",e.target.id)
        const response=await axios.get(`http://localhost:4300/addEvent/${user}/${e.target.id}`)
        console.log(response)
        setUpdatedUser(response.data)
        window.location.reload()
        const res=await axios.get(`http://localhost:4300/addstars/${user}`)
        console.log(res)
        
    }
    const onremove=async(e)=>{
        const user=window.localStorage.getItem('userEmail')
        console.log("USSS",user)
        console.log("FOL",e.target.id)
        const response=await axios.get(`http://localhost:4300/removeEvent/${user}/${e.target.id}`)
        console.log(response)
        
        setUpdatedUser(response.data)
        window.location.reload()
        const res=await axios.get(`http://localhost:4300/reducestars/${user}`)
    }
    return(
     <>
        <div>
            <div>
                <h2 style={{display:'display', margin:'auto', width:'10%', marginTop:'20px'}}>All Events</h2>
                <div style={{display:'block', margin:'auto', width:'60%', marginTop:'30px'}}>
                <button style={{marginLeft:'20px', width:'200px', backgroundColor:'lightblue', height:'35px', borderRadius:'10px'}} onClick={myevents}>Show my own events</button>
                <button style={{marginLeft:'20px', width:'200px', backgroundColor:'lightblue', height:'35px', borderRadius:'10px'}} onClick={ovevents}>Other vets events</button>
                {onlyfollowing.map((item)=>(
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div id="Usercard2">
                        <img src={item?.photoUrl} />
                        <div style={{marginTop:'10px', marginLeft:'20px'}}>
                        <h3>Event name ➡️ <span> {item?.name}</span></h3>
                        <h3>Event topic ➡️ <span>{item?.topic}</span></h3>
                        <h3>Event address ➡️ <span>{item?.address}</span></h3>
                        <h3>Event date ➡️ <span>{item?.date}</span></h3>
                        <h3>Event time ➡️ <span>{item?.time}</span></h3>
                        </div>
                        
                    </div>
                    <div style={{backgroundColor:'silver', width:'200px', marginTop:'20px'}}>
                       {following.includes(window.localStorage.getItem('userEmail')) ? <button id={item.name} style={{backgroundColor:'lightblue', height:'40px', width:'100px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px', cursor:'pointer'}} onClick={onremove}>Not Interested</button> :<button id={item.name} style={{backgroundColor:'lightblue', height:'40px', width:'100px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px',cursor:'pointer'}} onClick={onLike}>Interested</button> }
                    </div>
                    </div>
                ))}
                    
                </div>
            </div>
        </div>
     </>
    );
}

export default AllEvents