import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./login.css"
function SingIn(){
    const [data,setData]=useState('')
    useEffect(()=>{
            const getData=async()=>{
                const response=await axios.get('http://localhost:4300/veteran')
                setData(response.data)
            }   
            getData()     
    },[])
    const history=useHistory()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState({
        emailError:'',
        passError:''
    })
    const onsubmit=(e)=>{
        e.preventDefault()
        if(email===''){
            setError({emailError:"Email can't be empty"})
        }
        else if(password===''){
            setError({passError:"Password can't be empty"})
        }
        else{
            window.localStorage.setItem('userEmail',email)
            history.push('/')
        }
    }
    return(
      <>
      <div style={{width:'1000px' ,margin:'auto', display:'block' }}>
          <div id="loginDiv" > 
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" id="logImg" />
           <div>
               <form id="formDiv" onSubmit={onsubmit}>
                <input type="email" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                {(email==='') && <p style={{color:'red'}}>{error.emailError}</p>}
                <input type="password" placeholder="Your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                {(password==='') && <p style={{color:'red'}}>{error.passError}</p>}
                <button type="submit">Login</button>
               </form>
               <div style={{display:'flex',flexDirection:'row', marginTop:'20px'}}>
                <NavLink to="/" style={{fontSize:'20px'}}>Forgot Password?</NavLink>
                <NavLink to="/register" style={{fontSize:'20px', paddingLeft:'20px'}}>I don't have account</NavLink>
               </div>
           </div>
          </div>
          </div>
      </>
    );
}

export default SingIn