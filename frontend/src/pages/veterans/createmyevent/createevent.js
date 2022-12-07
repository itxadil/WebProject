import React, { useState } from "react";
import "./createve.css"
import {useHistory} from "react-router-dom"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"
import Calendar from 'react-calendar';
import Select from 'react-select'
import 'react-calendar/dist/Calendar.css';
function CreateVEvent(){

    const [userinfo,setUserInfo]=useState({})

    useEffect(()=>{
        const getallstudents=async()=>{
            const user=window.localStorage.getItem('userEmail')
            const response= await axios.get(`http://localhost:4300/veteran/${user}`)
            setUserInfo(response.data)
        }
        getallstudents()
    },[])
    const history=useHistory()
    // console.log("path",window.location.pathname)
    // if(window.location.pathname='/signup'){
    //     document.body.style = 'background: lightblue;';
    // }else{
    //     document.body.style = 'background: white;'
    // }
    const categories = [
        { value: '0', label: 'Select any category' },
        { value: 'Public Talks', label: 'Public Talks' },
        { value: 'Motivational Talks', label: 'Motivational Talks' },
        { value: 'Professional Talk', label: 'Professional Talk' },
        { value: 'Professional Task', label: 'Professional Task' },
        { value: 'Plantation Drives', label: 'Plantation Drives' },
        { value: 'Orphanage Visit', label: 'Orphanage Visit' },
        { value: 'Visiting patients into hospitals', label: 'Visiting patients into hospitals' },
        { value: 'Recreational Visit', label: 'Recreational Visit' },
        { value: 'Old Home Visit', label: 'Old Home Visit' },
        { value: 'Book Reading/Discussion', label: 'Book Reading/Discussion' },

      ]

   const [selectValue,setSelectValue]=useState()
   const handleChange=(e)=>{
    setSelectValue(e)
   }
    const [name,setName]=useState('')
    const [topic,setTopic]=useState('')
    const [rollnumber,setRoll]=useState('')
    const [contact,setContact]=useState('')
    const [address,setAddress]=useState('')
    const [category,setCategory]=useState('')
    const [time,setTime]=useState('')
    const [date,setDate]=useState(new Date())
    const [flag,setFlag]=useState(false)
    const [stars,setStars]=useState()
    const errors={
        name:'',
        topic:'',
        address:'',
        category:'',
        contact:'',
        date:'',
        time:'',
        stars:''
    }
   
    const userData={
        name:name,
        topic:topic,
        address:address,
        category:selectValue?.value,
        contact:contact,
        date:date,
        time:time,
        organizer:userinfo.email,
        stars:stars
      }
    const options={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userData)
      }
      const validateData=()=>{
        if(name===''){
            errors.name="Name can't be empty"
        }if(topic===''){
            errors.topic="Topic can't be empty"
        }if(address===''){
            errors.address="Address can't be empty"
        }if(category===''){
           errors.category="Category can't be empty"
        }if(contact===''){
            errors.contact="Contact number can't be empty"
        }if(time===''){
            errors.time="Please set time for event"
        }if(date===''){
            errors.date="Please set date for event"
        }if(stars===0 || stars>5000){
            errors.stars="Please set stars for event"
        }
      }
      const onfoc=()=>{
      setFlag(!flag)
      }
       const registerUser=async()=>{
            fetch("http://localhost:4300/postevent",options).then((response)=>console.log("Response",response))
            history.push("/")   
        }
        console.log(stars)
    return(
    <>
       <div className="signup-form">
        <form method="post" onSubmit={validateData}>
		<h2>Register</h2>
		<p className="hint-text">Create an event for veterans.</p>
        <div className="form-group">
			<div className="row">
				<div className="col"><input type="text" className="form-control" name="first_name" placeholder="Name"  value={name} onChange={(e)=>setName(e.target.value)}/></div>
                {name==='' && <p1 style={{color:'red'}}>{errors.name}</p1>}
				<div className="col"><input style={{marginLeft:'10px'}} type="text" className="form-control" name="rollnumber" placeholder="topic"  value={topic} onChange={(e)=>setTopic(e.target.value)}/></div>
                {topic==='' && <p1>{errors.topic}</p1>}
            </div>        	
        </div>
        <div className="form-group">
        <div className="row">
        	<input type="text" className="form-control" name="email" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            {address==='' && <p1>{errors.address}</p1>}
            <input style={{marginLeft:'20px'}} type="text" className="form-control" name="address" placeholder="Time"   value={time}  onChange={(e)=>setTime(e.target.value)}/>
            {time==='' && <p1>{errors.time}</p1>}
            </div>
        </div>
        <div className="form-group" style={{marginTop:'20px'}}>
            <input  type="text" className="form-control" name="stars" placeholder="Stars"  value={stars} onChange={(e)=>setStars(e.target.value)}/>
            {(stars===0 || stars >5000) && <p1>{errors.stars}</p1>}
        </div>
		<div className="form-group">
            <input type="text" className="form-control" name="password" placeholder="Contact" value={contact} onChange={(e)=>setContact(e.target.value)}/>
            {contact==='' && <p1>{errors.contact}</p1>}
            <input style={{marginLeft:'20px'}}  type="text" className="form-control" name="address" placeholder="Time" onFocus={onfoc}  value={date} />
            {date==='' && <p1>{errors.date}</p1>}
        </div>
      {flag && <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
        </div> }
        <Select
            styles={{marginLeft:'20px'}}
            value={selectValue}
            onChange={handleChange}
            options={categories}
        />
            {category==='' && <p1>{errors.category}</p1>}
           
		<div className="form-group" style={{marginTop:'20px'}}>
            <button  onClick={registerUser} type="submit" className="btn btn-success btn-lg btn-block">Create event</button>
        </div>
    </form>
</div>
    </>
    );
}
export default CreateVEvent