import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import "./invite.css"
function AllInvites(){
    var updatedInterested=[]
    const [data,setData]=useState([])
    
    useEffect(()=>{
        const getd=async()=>{
            const userinfo=window.localStorage.getItem("userEmail")
            const user=await axios.get(`http://localhost:4300/getinvites/${userinfo}`)
            setData(user.data)
        }
        getd()
    },[])
    console.log("user",data)
    const onInvite=async(e)=>{
        const userinfo=window.localStorage.getItem("userEmail")
       await axios.get(`http://localhost:4300/accepted/${e.target.id}/${userinfo}`)
        updatedInterested.push(e.target.id)
        window.location.reload()
    }
    // const fil=(age)=>{
    //     return 
    // }
    const onRemoveInvite=async(e)=>{
        const userinfo=window.localStorage.getItem("userEmail")
        const response=await axios.get(`http://localhost:4300/rejected/${e.target.id}/${userinfo}`)
        window.location.reload()
    }
    return(
    <>
       <div>
            <div>
                <h2 style={{display:'display', margin:'auto', width:'10%', marginTop:'20px'}}>All Invites</h2>
                <div style={{display:'block', margin:'auto', width:'60%', marginTop:'30px'}}>
                {data.map((item)=>(
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div id="Usercard11">
                    <img src={item?.photoUrl} />
                        <div style={{marginTop:'10px', marginLeft:'20px'}}>
                        <h3>Event name ➡️ <span> {item?.name}</span></h3>
                        <h3>Event topic ➡️ <span>{item?.topic}</span></h3>
                        <h3>Event address ➡️ <span>{item?.address}</span></h3>
                        <h3>Event date ➡️ <span>{item?.date}</span></h3>
                        <h3>Event time ➡️ <span>{item?.time}</span></h3>
                        <h3>Event organizer ➡️ <span>{item?.organizer}</span></h3>
                        </div>  
                    </div>
                    <div style={{backgroundColor:'silver', width:'200px', marginTop:'20px'}}>
                       {data?.interested?.includes(window.localStorage.getItem("userEmail")) ? <button id={item.name} style={{backgroundColor:'lightblue', height:'40px', width:'150px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px', cursor:'pointer'}} onClick={onRemoveInvite}>Reject</button> :<button id={item.name} style={{backgroundColor:'lightblue', height:'40px', width:'100px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px',cursor:'pointer'}} onClick={onInvite}>Accept</button> }
                    </div>
                    </div>
                ))}
                    
                </div>
            </div>
        </div>
    </>
    );
}

export default AllInvites