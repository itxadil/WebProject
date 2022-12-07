import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import photo1 from "../../../assets/images/acc.png"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./org.css"
function RegisterOrg() {
  const [userinfo, setUserInfo] = useState({
    hobbies: [],
    response: [],
  });
  const history=useHistory()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [profession,setProfession]=useState('')
    const [password,setPassword]=useState('')
    const [flag,setFlag]=useState(false)
    const [gender,setGender]=useState('')
    const [loaded,setLoaded]=useState(false)
    // const [hobbies,setHobbies]=useState({
    //   PublicTalks:"",
    //   MotivationalTalks:"",
    //   ProfessionalTalk:"",
    //   ProfessionalTask:"",
    //   PlantationDrives:"",
    //   OrphanageVisit:"",
    //   Visitingpatientsintohospitals:"",
    //   RecreationalVisit:"",
    //   OldHomeVisit:"",
    //   BookReadingDiscussion:""
    // })
    const hobbies={
      PublicTalks:"",
      MotivationalTalks:"",
      ProfessionalTalk:"",
      ProfessionalTask:"",
      PlantationDrives:"",
      OrphanageVisit:"",
      Visitingpatientsintohospitals:"",
      RecreationalVisit:"",
      OldHomeVisit:"",
      BookReadingDiscussion:""
    }

    // const [PublicTalks,setPublicTasks]=useState('')
    // const [MotivationalTalks,setMotivationalTalks]=useState('')
    // const 
    const [hobbiesFlags,setHobbiesFlags]=useState({
      PublicTalks:false,
      MotivationalTalks:false,
      ProfessionalTalk:false,
      ProfessionalTask:false,
      PlantationDrives:false,
      OrphanageVisit:false,
      Visitingpatientsintohospitals:false,
      RecreationalVisit:false,
      OldHomeVisit:false,
      BookReadingDiscussion:false
    })

    const onflagchange=()=>{
        setFlag(!flag)
    }
    const [error,setError]=useState({
        nameError:'',
        passError:'',
        flagError:'',
        profError:'',
        emailError:'',
        hobbiesError:'',
        genderError:''
    })

    const handleChange = (e) => {
      // Destructuring
      const { value, checked } = e.target;
      const { hobbies } = userinfo;
        
      console.log(`${value} is ${checked}`);
       
      // Case 1 : The user checks the box
      if (checked) {
        setUserInfo({
          hobbies: [...hobbies, value],
          response: [...hobbies, value],
        });
      }
    
      // Case 2  : The user unchecks the box
      else {
        setUserInfo({
          hobbies: hobbies.filter((e) => e !== value),
          response: hobbies.filter((e) => e !== value),
        });
      }
    };

   
    const onc=()=>{
      document.getElementById('selectedImg1').click()
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
			document.getElementById("loadedImg").src=loadedimage.src;
      console.log(document.getElementById("loadedImg").src)
      setImg(loadedimage.src)
		};
		}     
   }
    const data={
      photoUrl:img,
      name:name,
      email:email,
      password:password,
      profession:profession,
    }
    
    const onsubmit=(e)=>{
        e.preventDefault()
        let hobbiesList=[]
      if(name===''){
        setError({nameError:"Name can't be empty"})
      }
      else if(email===''){
        setError({emailError:"Email can't be empty"})
      }
      else if(password===''){
        setError({passError:"Password can't be empty"})
      }
      else if(profession===''){
        setError({profError:"Profession can't be empty"})
      }
      else if(flag===false){
        setError({flagError:"Checkbox must be checked"})
      }
      else{
        const response=axios.post('http://localhost:4300/community',data)
        console.log(response)
        history.push('/communitylog')
      }
    }    
  return (
    <div style={{ width:'1000px', backgroundColor:'silver',margin:'auto',display:'block', marginTop:'20px' }}>
          <input type="file" id="selectedImg1" style={{display: 'none'}} onChange={showFile} />
    <MDBContainer fluid style={{dispaly:'flex', flexDirection:'row'}}>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <div id="firstdiv">
              <p style={{marginLeft:'80px', color:'black', fontWeight:'bold', fontSize:'40px'}} classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>
              <form onSubmit={onsubmit}>
              <div>
              <img src={photo1} alt="preview-img" id="loadedImg" onClick={onc}></img>
              </div>
              <div className="d-flex flex-row align-items-center mb-4" style={{marginTop:'20px'}}>
                <MDBIcon fas icon="user me-3" size="lg" />
                <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                  placeholder="Organization name"
                  id="form1"
                  type="text"
                  className="w-100"
                />
                {name==='' && <p style={{color:'black', marginLeft:'5px', fontWeight:'bold'}}>{error.nameError}</p>}
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
              <input placeholder="Your Email" id="form2" type="email" value={email}
                onChange={(e)=>setEmail(e.target.value)} />
                {email==='' && <p style={{color:'black', marginLeft:'5px', fontWeight:'bold'}}>{error.emailError}</p>}
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <input placeholder="Profession" id="form3" type="text" value={profession}
                onChange={(e)=>setProfession(e.target.value)} />
                {profession==='' && <p style={{color:'black', marginLeft:'5px', fontWeight:'bold'}}>{error.profError}</p>}
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size="lg" />
                <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Your password"
                  id="form4"
                  type="password"
                />
                {password==='' && <p style={{color:'black', marginLeft:'5px', fontWeight:'bold'}}>{error.passError}</p>}
              </div>
              <div className="mb-4" style={{display:'flex', flexDirection:'row',marginTop:'30px'}}>
                <input type="checkbox" style={{ height:"20px", width:'40px', marginLeft:'-10px'}} value={flag} onChange={onflagchange} />
                <p>I agree with all terms and conditions</p>
                
              </div>
              {flag===false && <p style={{color:'black', fontWeight:'bold'}}>{error.flagError}</p>}
              <button type="submit" style={{backgroundColor:'blue',marginBottom:'20px', color:'white', marginTop:'30px', marginLeft:'100px',fontSize:'20px', width:'100px', height:'40px', borderRadius:'10px', }}>
                Register
              </button>
              </form>
              <NavLink to="/communitylog" style={{fontSize:'20px', marginLeft:'-20px'}}>Already have an account?</NavLink>
            </div>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage style={{width:'500px', height:'700px', marginLeft:'45%', marginBottom:'10px'}}
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </div>
  );
}

export default RegisterOrg;