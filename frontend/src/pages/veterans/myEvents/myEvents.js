import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import "./myEvents.css"

function MyEvents(){
    var sameHobbies=[]
    const [data,setData]=useState([])
    const [userInfo,setUserInfo]=useState([])
    const history=useHistory()
    useEffect(()=>{
        const getVets=async()=>{
            const user=window.localStorage.getItem('userEmail')
            // const response=await axios.get(`http://localhost:4300/veteran/${user}`)
            // setUserInfo(response.data)

            const events=await axios.get(`http://localhost:4300/vevents/${user}`)
            setData(events.data)
        }
        getVets()
    },[])
    return (
         <>
            <div>
            <div>
                <h2 style={{display:'display', margin:'auto', width:'10%', marginTop:'20px'}}>My events</h2>
                <div style={{display:'block', margin:'auto', width:'60%', marginTop:'30px'}}>
                {data.map((item)=>(
                    <div style={{display:'flex', flexDirection:'row'}} onClick={()=>history.push({
                        pathname:"/inviteovets",
                        state:{detail:item?.name}
                    })}>
                    <div id="Usercard6">
                        <img src={item?.photUrl} />
                        <div style={{marginTop:'10px', marginLeft:'20px'}}>
                        <h3>Event name ➡️ <span> {item?.name}</span></h3>
                        <h3>Event topic ➡️ <span>{item?.topic}</span></h3>
                        <h3>Event address ➡️ <span>{item?.address}</span></h3>
                        <h3>Event date ➡️ <span>{item?.date}</span></h3>
                        <h3>Event time ➡️ <span>{item?.time}</span></h3>
                        </div>
                        
                    </div>
                    </div>
                ))}
                    
                </div>
            </div>
        </div>
         </>
    );
}

export default MyEvents