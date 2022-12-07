import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./oV.css"
var following1=[]
var userinfo=window.localStorage.getItem('userEmail')
function OVEvents(){
    const [data,setData]=useState([])
    const [data1,setData1]=useState([])
    
    useEffect(()=>{
        const getovets=async()=>{
            const user=window.localStorage.getItem('userEmail')
            const allEv=await axios.get(`http://localhost:4300/getvevents/${user}`)
            console.log("AALLV",allEv.data)
            setData(allEv.data)
          
        }
        getovets()
    },[])
      data.map((item)=>{
        for(let i=0;i<item?.interested?.length;i++){
            console.log(item.interested[i])
            following1.push(item.interested[i])
        }
      })
    const onLike=async(e)=>{
        const user=window.localStorage.getItem('userEmail')
        console.log("USSS",user)
        console.log("FOL",e.target.id)
        const res=axios.get(`http://localhost:4300/vovadd/${user}/${e.target.id}`)
        setData1(res.data)
        window.location.reload()
        const res1=axios.get(`http://localhost:4300/addstars/${user}`)
        console.log(res1)
    }
    const onremove=async(e)=>{
        const user=window.localStorage.getItem('userEmail')
        console.log("USSS",user)
        console.log("FOL",e.target.id)
        const res= axios.get(`http://localhost:4300/vovdel/${user}/${e.target.id}`)
        setData1(res.data)
        window.location.reload()
        const res1=await axios.get(`http://localhost:4300/reducestars/${user}`)
        console.log(res)
    }

    return(
      <>
         <div>
            <div>
                <h2 style={{display:'display', margin:'auto', width:'27%', marginTop:'20px'}}>Events organized by other veterans</h2>
                <div style={{display:'block', margin:'auto', width:'60%', marginTop:'30px'}}>

                {data.map((item)=>(
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div id="Usercard9">
                        <img src={item?.photoUrl} />
                        <div style={{marginTop:'10px', marginLeft:'20px'}}>
                        <h3>Event name ➡️ <span> {item?.eventname}</span></h3>
                        <h3>Event topic ➡️ <span>{item?.topic}</span></h3>
                        <h3>Event address ➡️ <span>{item?.address}</span></h3>
                        <h3>Event date ➡️ <span>{item?.date}</span></h3>
                        <h3>Event time ➡️ <span>{item?.time}</span></h3>
                        <h3>Event organizer ➡️ <span>{item?.name}</span></h3>
                        </div>
                        
                    </div>
                    <div style={{backgroundColor:'silver', width:'200px', marginTop:'20px'}}>
                       {item.interested.includes(userinfo) ? <button id={item.eventname} style={{backgroundColor:'lightblue', height:'40px', width:'100px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px', cursor:'pointer'}} onClick={onremove}>Not Interested</button> :<button id={item.eventname} style={{backgroundColor:'lightblue', height:'40px', width:'100px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px',cursor:'pointer'}} onClick={onLike}>Interested</button> }
                    </div>
                    </div>
                ))}
                    
                </div>
            </div>
        </div>
      </>
    );
}

export default OVEvents