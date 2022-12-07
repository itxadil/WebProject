import React from "react";
import axios from "axios";
import "./profile.css"
var list=[]
function Profile(props){
    console.log("props",props.location.state.detail.hobbies)
    for(let i=0;i<props.location.state.detail.hobbies.length;i++){
       list.push({
        number:i,
        hobby:props.location.state.detail.hobbies[i]
       })
    }
    
   return(
     <>
      <h1 style={{marginTop:'10px', width:'14%', margin:'auto', display:'block'}}>User's Profile</h1>
      <div id="main_div">
      <img src={props.location.state.detail.photoUrl} id="profimg"/>
      <h2>Name ➡️ <span>{props.location.state.detail.name}</span> </h2>
      <h2>Profession ➡️ <span>{props.location.state.detail.profession}</span> </h2>
      <h2>Email ➡️ <span>{props.location.state.detail.email}</span> </h2>
      <h1 style={{marginTop:'10px'}}>Hobbies</h1>
        {list.map((item)=>(
            <div style={{display:'flex', flexDirection:'row' , marginLeft:'150px', marginTop:'20px'}}>
            <input type="checkbox" checked value={item.hobby}  />
            <h3>{item.hobby}</h3>
            </div>
        ))}
      </div>
      
     </>
   );
}

export default Profile