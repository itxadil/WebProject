import React from "react";
import './header.css'
import { NavLink } from "react-router-dom";
import photo from "../../assets/images/meetlogo.png"
import {useHistory} from "react-router-dom"
function Header(){
  const history=useHistory()
  const onclick=()=>{
    window.localStorage.removeItem('userEmail')
    history.push('/login')
  }
    return(
      <>
        <div>
            <ul id="list">

              <img src={photo} width="80px" id="logoimg"/>
              <div id="links">
                <NavLink style={{fontSize:'22px' , textDecoration:'none' }} to="/" exact >Home</NavLink>
                <NavLink style={{fontSize:'22px' , textDecoration:'none', marginLeft:'50px'}} to="/register" exact >Register</NavLink>
                <NavLink style={{fontSize:'22px' , textDecoration:'none', marginLeft:"50px" }} to="/" exact >About us</NavLink>
                {window.localStorage.getItem('userEmail') && <button style={{marginLeft:'30px' , width:'100px' , height:'30px', backgroundColor:'skyblue' }} id="btnnnLog" onClick={onclick}>Logout</button>}
                {/* <NavLink to="/" exact >Home</NavLink> */}
                </div>
            </ul>
        </div>
      </>
    );
}

export default Header