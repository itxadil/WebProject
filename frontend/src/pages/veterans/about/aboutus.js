import React from "react";
import adil from "../../../assets/images/adil.jpeg"
import asim from "../../../assets/images/asim.jpeg"
import asfand from "../../../assets/images/asfand.jpeg"
import "./about.css"
function AboutVet(){
    return(
      <>
        <div class="about-section">
  <h1>About Us Page</h1>
  <p>This is Veteran meet, a social web app.</p>
  <p>Developed for veterans to socialize and take parts in different community events</p>
</div>

<h2 style={{textAlign:"center"}}>Our Team</h2>
<div class="row">
  

  <div class="column">
    <div class="card">
      <img src={adil} alt="Adil" width="100%" styles={{width:"10%"}} />
      <div class="container">
        <h2>Adil Jamali</h2>
        <p class="title">Full stack developer</p>
        <p>Designed and devloped few screens of veteranMeet and created some apis</p>
        <p>i192150@nu.edu.pk</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <img src={asfand} alt="Asfandyar" style={{width:"100%"}} />
      <div class="container">
        <h2>Asfandyar sabri</h2>
        <p class="title">Backend developer</p>
        <p>Created apis on backend of veteranMeet</p>
        <p>i192187@nu.edu.pk</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src={asim} alt="Asim" style={{width:"100%"}} />
      <div class="container">
        <h2>Asim umar</h2>
        <p class="title">Designer and frontend developer</p>
        <p>Designed UI of veteranMeet and worked on some screens on frontend</p>
        <p>i190595@nu.edu.pk</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
      </>
    );
}

export default AboutVet