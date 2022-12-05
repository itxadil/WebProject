import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./allv.css"
var following=[]
var exceptUser=[]
function AllVeterans(){
    const [veterans,setVeterans]=useState([])
    const [updatedUser,setUpdatedUser]=useState([])
    const [flag,setFlag]=useState(false)
    const [beforeup,setBeforeup]=useState([])
    function checkown(age) {
        return age !== window.localStorage.getItem('userEmail');
      }
    useEffect(()=>{
        const getVeterans=async()=>{
        const user=window.localStorage.getItem('userEmail')
          const response=await axios.get('http://localhost:4300/veteran')
          let newarr=response.data.filter(checkown)
          setVeterans(newarr)
          console.log(response.data)
          response.data.map((item)=>{
            if(item.email!==user){
                exceptUser.push(item)
            }
          })
          setVeterans(exceptUser)
          const user1=await axios.get(`http://localhost:4300/veteran/${user}`)
          user1?.data?.following.forEach((e)=>{
            console.log("D",e)
            following.push(e)
          })
        
          setBeforeup(user1.data)
        }
        getVeterans()
    },[])
    if(following.includes("adil.jamali@bentley.com")){
     console.log("HAi")
    }else{
        console.log("NHI")
    }
    const onLike=async(e)=>{
        const user=window.localStorage.getItem('userEmail')
        console.log("USSS",user)
        console.log("FOL",e.target.id)
        const response=await axios.get(`http://localhost:4300/veteran/addFriend/${user}/${e.target.id}`)
        console.log(response)
        setUpdatedUser(response.data)
        window.location.reload()
    }
    const onremove=async(e)=>{
        const user=window.localStorage.getItem('userEmail')
        console.log("USSS",user)
        console.log("FOL",e.target.id)
        const response=await axios.get(`http://localhost:4300/veteran/removeFriend/${user}/${e.target.id}`)
        console.log(response)
        setUpdatedUser(response.data)
        window.location.reload()
    }
    return(
     <>
        <div>
            <div>
                <h2 style={{display:'display', margin:'auto', width:'18%', marginTop:'20px'}}>People you may know</h2>
                <div style={{display:'block', margin:'auto', width:'60%', marginTop:'30px'}}>
                {veterans.map((item)=>(
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div id="Usercard">
                        <img src={item?.photoUrl} />
                        <div style={{marginTop:'10px', marginLeft:'20px'}}>
                        <h3>{item?.name}</h3>
                        <h3>{item?.profession}</h3>
                        <h3>{item?.email}</h3>
                        </div>
                        
                    </div>
                    <div style={{backgroundColor:'silver', width:'200px', marginTop:'20px'}}>
                       {following.includes(item?.email) ? <button id={item?.email} style={{backgroundColor:'lightblue', height:'40px', width:'100px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px', cursor:'pointer'}} onClick={onremove}>Remove</button> :<button id={item?.email} style={{backgroundColor:'lightblue', height:'40px', width:'100px', borderRadius:'10px', display:'block', margin:'auto', marginTop:'50px',cursor:'pointer'}} onClick={onLike}>Add friend</button> }
                    </div>
                    </div>
                ))}
                    
                </div>
            </div>
        </div>
     </>
    );
}

export default AllVeterans