import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import LocationPin from 'google-map-react'
import GoogleMapReact from 'google-map-react'

function Onmap(props){
    const [location,setLocation]=useState({lat:'',lng:''})
    useEffect(()=>{
        const getlocation=async()=>{

       await navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
           setLocation({lat:position.coords.latitude,lng:position.coords.longitude})
          });

        }
        getlocation()
    })
  

    return(
     <>
 <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
        />
      </GoogleMapReact>
    </div>
  </div>
     </>
    );

}

export default Onmap