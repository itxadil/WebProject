import axios from "axios";
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import './commOnm.css'
function CommOnMind(props){
    const history=useHistory()
    const [post,setPost]=useState('')
    const [user,setUser]=useState({})
    const [photourl,setPhoturl]=useState('')
    const [video,setVideo]=useState('')
    const [flag,setFlag]=useState(false)
    useEffect(()=>{
        const getuser=async()=>{
             const response=await axios.get(`http://localhost:4300/community/${props.location.state.detail}`)
             setUser(response.data)
        }
        getuser()
    },[])
    const onf=()=>{
        setFlag(!flag)
    }

    const onc=()=>{
        document.getElementById('selectedImg2').click()
     }
     const onc1=()=>{
        document.getElementById('selectedVid2').click()
     }
     const [img,setImg]=useState('')
     const showFile=(event)=>{
      event.preventDefault()
          var file_read = new FileReader();
          file_read.readAsDataURL(event.target.files[0]);
          file_read.onload = function (e) {
          var loadedimage=new Image();
          loadedimage.src=e.target.result;
      console.log(loadedimage.src)
          loadedimage.onload = function () {
        setImg(loadedimage.src)
        document.getElementById("imgtag").src=loadedimage.src;
          };
          }     
     }

     const showFile1 = (event) => {
        const file = event.target.files[0];
        // console.log("FFF",file)
        // const url = URL.createObjectURL(file);
        setVideo(file);
      };


    const object={
        email:props.location.state.detail,
        post:{
            content:post,
            photos:img,
            videos:video
        }
    }
    const onsubmit=async()=>{
       const response=axios.post('http://localhost:4300/community/post', object)
       console.log(response)
       history.push('/communityHome')
    }
   return(
    <> 
     <div id="mindCont1">
       <div>
       <div id="insideDiv1">
       <img style={{width:'100px' ,height:'100px', borderRadius:'100%'}} src={user.photoUrl} />
       <h3 style={{fontSize:'30px',marginLeft:'10px', fontWeight:'bold', marginTop:'30px'}} >{user.name}</h3>
       </div>
        <form onSubmit={onsubmit}>
        <textarea value={post} onChange={(e)=>setPost(e.target.value)} rows = "5" cols = "60" name = "description" style={{marginTop:'20px', borderRadius:'20px', paddingTop:'10px',paddingLeft:'10px', height:'300px'}}>
            Enter details here...  
         </textarea><br></br>
            <button style={{ float:'right', width:'100px', height:'40px', marginTop:'20px', backgroundColor:'skyblue', borderRadius:'10px', marginRight:'20px'}}>Post</button>
        </form>
        </div>
        <input type="file" id="selectedImg2" style={{display: 'none'}} onChange={showFile} />
        <input type="file" id="selectedVid2" style={{display: 'none'}} onChange={showFile1} />
        <div style={{display:'flex', flexDirection:'row'}}>
        <div style={{marginTop:'20px', display:'flex',flexDirection:'column'}}>
            <button style={{width:'100px', border:'none', backgroundColor:'skyblue', height:'30px', borderRadius:'10px'}}>Tag people</button>
            <button style={{width:'120px', border:'none', backgroundColor:'skyblue' ,marginTop:'20px',height:'30px', borderRadius:'10px'}} onClick={onc}>Add photo</button>
            <button style={{width:'120px', border:'none', backgroundColor:'skyblue' ,marginTop:'20px',height:'30px', borderRadius:'10px'}} onClick={onc1}>Add video</button>
        </div>
        {img!=='' && <img id="imgtag" style={{width:'230px', height:'150px', marginLeft:'20px', marginTop:'10px', borderRadius:'10px'}} /> }
        {video!=='' && <video
          className="VideoInput_video"
          width="230px"
          height="150px"
          controls
          src={video}
          style={{borderRadius:'10px', marginLeft:'20px', marginTop:'10px'}}
        />}
        </div>
     </div>
    </>
   );
}

export default CommOnMind

