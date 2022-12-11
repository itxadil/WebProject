import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./oV.css"
import Select from "react-select"

var userinfo=window.localStorage.getItem('userEmail')
function OVEvents(){
    var following1=[]
    var setlocations=[]
    const [data,setData]=useState([])
    const [data1,setData1]=useState([])
    const [flag1,setFlag1]=useState(false)
    const [flag,setFlag]=useState(false)
    const [flag2,setFlag2]=useState(false)
    const [loc,setLoc]=useState('')
    const [newarr,setNewArr]=useState([])
    const [selectedOption,setSelectedOption]=useState({
        value:loc,
        label:loc
    })
    const options = [
        { value: loc, label: loc },
        { value: 'Karachi', label: 'Karachi' },
        { value: 'Lahore', label: 'Lahore' },
        { value: 'Faisalabad', label: 'Faisalabad' },
      ];
      let options1 = options.filter(function(item, pos) {
        return options.indexOf(item) == pos;
    })
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
    const handleChange=(e)=>{
        setSelectedOption(e)
        data.map((item)=>{
            console.log("SSSS",item.address)
            let s=item.address.slice(1);
            let str=item.address.toString().charAt(0).toUpperCase()+s
            console.log("str",str)
            if(str.includes(e.value)){
              console.log("HAI BHAE HAI")
                setlocations.push(item)
                setNewArr(setlocations)
                console.log("Con",setlocations)
                setFlag(true)
            }else{
                console.log("H")
                setFlag(false)
            }
          })
  }

  
  const showlocation=async()=>{
    navigator.geolocation.getCurrentPosition(async (position) => {
           console.log("Latitude is :", position.coords.latitude);
           console.log("Longitude is :", position.coords.longitude);
           const response=await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
           console.log("LOOOOOO",response.data.address.city)
           setLoc(response.data.address.city)
           setSelectedOption({value:response.data.address.city,label:response.data.address.city})
           setFlag1(true)
           setFlag2(!flag2)
         });
         }
            let uniqueArray = newarr.filter(function(item, pos) {
                return newarr.indexOf(item) == pos;
            })
    return(
      <>
     
         <div>
         
            <div>
            
                <h2 style={{display:'display', margin:'auto', width:'27%', marginTop:'20px'}}>Events organized by other veterans</h2>
                <div style={{display:'flex',margin:'auto', width:'500px', flexDirection:'row', marginTop:'30px'}}>
                  <button style={{marginLeft:'20px', width:'200px', backgroundColor:'lightblue', height:'35px', borderRadius:'10px'}} onClick={showlocation}>Get location</button>
                <div style={{width:'200px', marginLeft:'20px'}}>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options1}
                />
                </div>
                </div>
                <div style={{display:'block', margin:'auto', width:'60%', marginTop:'30px'}}>

                { selectedOption.value===0 ?  <h1 style={{width:'50%',display:'block', margin:'auto', marginTop:'20%'}}>Select a city for events</h1> : (!flag) ? <h1 style={{width:'68%',display:'block', margin:'auto', marginTop:'20%'}}>No upcoming events in<span> {selectedOption.value}</span></h1> : uniqueArray.map((item)=>(
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