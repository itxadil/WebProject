import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from "react-select"
import "./allevents.css"
   
function AllEvents(props){
    let following=[]
    let onlyfollowing=[]
    let setlocations=[]
    const history=useHistory()
    const [events,setEvents]=useState([])
    const [updatedUser,setUpdatedUser]=useState([])
    const [location,setLocation]=useState({lat:'',lng:''})
    const [flag1,setFlag1]=useState(false)
    const [flag,setFlag]=useState(false)
    const [flag2,setFlag2]=useState(false)
    const [beforeup,setBeforeup]=useState({})
    const [loc,setLoc]=useState('')
    const [newarr,setNewArr]=useState([])
    const [selectedOption,setSelectedOption]=useState({
        value:loc,
        label:loc
    })
    
    function checkown(age) {
        return age !== window.localStorage.getItem('userEmail');
      }
      
       useEffect(()=>{
        const getVeterans=async()=>{
        const user=window.localStorage.getItem('userEmail')
      
          const user1=await axios.get(`http://localhost:4300/veteran/${user}`)
          setBeforeup(user1.data)
        }
        getVeterans()
       
    },[])
    useEffect(()=>{
        const getd=async()=>{
            const user=window.localStorage.getItem('userEmail')
            const response=await axios.get('http://localhost:4300/events')
      
            setEvents(response.data)
        }
        getd()
      },[])
      events.map((item)=>{
        if(beforeup?.hobbies?.includes((item.category))){
            onlyfollowing.push(item)
        }
      })
    events.map((item)=>{
        item.interested.forEach((item1)=>{
            following.push(item1)
        })
      })
     console.log("VVV",events)
    const options = [
        { value: loc, label: loc },
        { value: 'Karachi', label: 'Karachi' },
        { value: 'Lahore', label: 'Lahore' },
        { value: 'Faisalabad', label: 'Faisalabad' },
      ];
      let options1 = options.filter(function(item, pos) {
        return options.indexOf(item) == pos;
    })
    console.log("ONL",onlyfollowing)
    // if(following.includes(window.localStorage.getItem('userEmail'))){
    //     console.log()
    // }
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
    console.log("HELLO",onlyfollowing)
    const handleChange=(e)=>{
        setFlag1(false)
          setSelectedOption(e)
          onlyfollowing.map((item)=>{
            console.log("SSSS",item.address)
            let s=item.address.slice(1);
            let str=item.address.toString().charAt(0).toUpperCase()+s
            console.log("str",str)
            console.log("e",e.value)
            if(str.includes(e.value)){
                console.log("HAI BHAE")
                setlocations.push(item)
                console.log("LOCCC",setlocations)
                setNewArr(setlocations)
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
                 console.log("set",selectedOption.value)
                 setFlag1(true)
                 setFlag2(!flag2)
               });
    }
    

    let uniqueArray = newarr.filter(function(item, pos) {
        return newarr.indexOf(item) == pos;
    })
    console.log("UN",setlocations)
    return(
     <>
        <div>
            <div>
                <h2 style={{display:'display', margin:'auto', width:'10%', marginTop:'20px'}}>All Events</h2>
                <div style={{display:'block', margin:'auto', width:'60%', marginTop:'30px'}}>

                <button style={{marginLeft:'20px', width:'200px', backgroundColor:'lightblue', height:'35px', borderRadius:'10px'}} onClick={myevents}>Show my own events</button>
                <button style={{marginLeft:'20px', width:'200px', backgroundColor:'lightblue', height:'35px', borderRadius:'10px'}} onClick={ovevents}>Other veterans events</button>
                <button style={{marginLeft:'20px', width:'200px', backgroundColor:'lightblue', height:'35px', borderRadius:'10px'}} onClick={showlocation}>Get location</button>
                <div style={{width:'200px', marginTop:'20px', marginLeft:'20px'}}>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options1}
                />
                </div>
                {!flag2 ?  <h1 style={{width:'125%',display:'block', margin:'auto', marginTop:'20%'}}>Click on Get location button to get current location</h1> : flag1  ? <h1 style={{width:'125%',display:'block', margin:'auto', marginTop:'20%'}}>Select first option from drop down to get upcoming events in <span>{loc}</span></h1> : selectedOption.value===0 ?  <h1 style={{width:'50%',display:'block', margin:'auto', marginTop:'20%'}}>Select a city for events</h1>
                 :  (!flag) ? <h1 style={{width:'68%',display:'block', margin:'auto', marginTop:'20%'}}>No upcoming events in<span>{  selectedOption.value}</span></h1> :
                 uniqueArray.map((item)=>(
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
                )) }
                    
                </div>
            </div>
        </div>
     </>
    );
}

export default AllEvents