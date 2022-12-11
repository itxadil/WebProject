import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import "./invite.css"

function InviteVets(props){
    var uninterested=[]
    var updatedInterested=[]
    const [data,setData]=useState([])
    const [Invitations,setInvitations]=useState([])
    const [updatedUser,setUpdatedUser]=useState([])
    useEffect(()=>{
        const getUnInterested=async()=>{
        const allVets=await axios.get('http://localhost:4300/veteran')
        setData(allVets.data)       
        }
        getUnInterested()

    },[])


    useEffect(()=>{
        const getUnInterested=async()=>{
        const myEvents=await axios.get(`http://localhost:4300/getmyevents/${props.location.state.detail}`)
        myEvents?.data.map((item)=>{
            for(let i=0;i<item?.invited?.length;i++){
               updatedInterested.push(item.invited[i])
            }
        })
        setInvitations(myEvents.data)
        console.log("MYEVENT",myEvents.data)       
        }
        getUnInterested()       
    },[])

    Invitations.map((item)=>{
        data.map((item1)=>{
            for(let i=0;i<item1?.hobbies?.length;i++){
                if(item1?.hobbies[i]===item?.category){
                    console.log(item1?.hobbies[i])
                      uninterested.push(item1)
                }
            }
            
        })
    })

    var newList=uninterested
    const onInvite=async(e)=>{
        const response=await axios.get(`http://localhost:4300/invite/${e.target.id}/${props.location.state.detail}`)
        console.log(response)
        setUpdatedUser(response.data)
        window.location.reload()
    }
    const onRemoveInvite=async(e)=>{
        const user=window.localStorage.getItem('userEmail')
        console.log("USSS",user)
        console.log("FOL",e.target.id)
        const response=await axios.get(`http://localhost:4300/removeinvite/${e.target.id}/${props.location.state.detail}`)
        console.log(response)
        setUpdatedUser(response.data)
        window.location.reload()
    }
  return(
   <>
      <div>
            <div>
                <h2 style={{display:'display', margin:'auto', width:'22%', marginTop:'20px'}}>Invite uninterested veterans</h2>
                <div style={{display:'block', margin:'auto', width:'60%', marginTop:'30px'}}>
                {uninterested.map((item)=>(
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div id="Usercard5">
                        <img src={item?.photoUrl} />
                        <div style={{marginTop:'10px', marginLeft:'20px'}}>
                        <h3>{item?.name}</h3>
                        <h3>{item?.profession}</h3>
                        <h3>{item?.email}</h3>
                        </div>
                        
                    </div>
                    <div style={{backgroundColor:'silver', width:'200px', marginTop:'20px'}}>
                       {updatedInterested.includes(item?.email) ? <button id={item?.email} style={{backgroundColor:'lightblue', height:'40px', width:'150px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px', cursor:'pointer'}} onClick={onRemoveInvite}>Remove Invitation</button> :<button id={item?.email} style={{backgroundColor:'lightblue', height:'40px', width:'100px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px',cursor:'pointer'}} onClick={onInvite}>Invite</button> }
                    </div>
                    </div>
                ))}
                    
                </div>
            </div>
        </div>
   </>
  );
}

export default InviteVets