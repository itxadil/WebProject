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
import "./register.css"
function Register() {
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
      document.getElementById('selectedImg').click()
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
      gender:gender,
      hobbies:userinfo.hobbies
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
      else if(userinfo.hobbies.length===0){
        setError({hobbiesError:"Please select atleast one hobby"})
      }else if(gender===''){
        setError({genderError:"Please select gender"})
      }
      else{
        const response=axios.post('http://localhost:4300/veteran',data)
        console.log(response)
        history.push('/login')
      }
    }
    
  return (
    <div style={{ width:'1000px', backgroundColor:'silver',margin:'auto',display:'block' }}>
          <input type="file" id="selectedImg" style={{display: 'none'}} onChange={showFile} />
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
                  placeholder="Your Name"
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
              <h3 style={{marginTop:'20px'}}>Gender</h3>
              <div style={{display:'flex',flexDirection:'row', marginTop:'10px'}}>
                
                <input name="Gender" value="male" type="radio" onChange={(e)=>setGender('Male')} />
                <p>Male</p>
                <input style={{marginLeft:'20px'}} name="Gender" value="female" type="radio" onChange={(e)=>setGender('Female')} />
                <p>Female</p>
              </div>
              {gender==='' && <p style={{color:'black', marginLeft:'5px', fontWeight:'bold'}}>{error.genderError}</p>}
              <h3 style={{marginTop:'20px'}}>Hobbies</h3>
              <div style={{display:'flex', flexDirection:'row'}}>
                <input type="checkbox" value="Public Talks" onChange={handleChange}/>
                <p>Public Talks</p>
                <input type="checkbox" value="Professional Talk"  onChange={handleChange} />
                <p>Professional Talk</p>
                <input type="checkbox" value="Motivational Talks" onChange={handleChange} />
                <p>Motivational Talks</p>
              </div>
              <div style={{display:'flex', flexDirection:'row'}}>
                <input type="checkbox" value="Professional Task" onChange={handleChange}  /> 
                <p>Professional Task</p>
                <input type="checkbox" value="Plantation Drives" onChange={handleChange} />
                <p>Plantation Drives</p>
                <input type="checkbox" value="Orphanage Visit" onChange={handleChange} />
                <p>Orphanage Visit</p>
              </div>
              <div style={{display:'flex', flexDirection:'row'}}>
                <input type="checkbox" value="Visiting patients into hospitals" onChange={handleChange} />
                <p>Visiting patients into hospitals</p>
                <input type="checkbox" value="Recreational Visit"  onChange={handleChange} />
                <p>Recreational Visit</p>
               
              </div>
              <div style={{display:'flex', flexDirection:'row'}}>
                <input type="checkbox" value="Book Reading/Discussion" onChange={handleChange} />
                <p>Book Reading/Discussion</p>
                <input type="checkbox" value="Old Home Visit" onChange={handleChange} />
                <p>Old Home Visit</p>
              </div>
              {(userinfo.hobbies.length) && <p style={{color:'black', marginLeft:'5px', fontWeight:'bold'}}>{error.hobbiesError}</p> }
              <div className="mb-4" style={{display:'flex', flexDirection:'row',marginTop:'30px'}}>
                <input type="checkbox" style={{ height:"20px", width:'40px', marginLeft:'-10px'}} value={flag} onChange={onflagchange} />
                <p>I agree with all terms and conditions</p>
                
              </div>
              {flag===false && <p style={{color:'black', fontWeight:'bold'}}>{error.flagError}</p>}
              <button type="submit" style={{backgroundColor:'blue',marginBottom:'20px', color:'white', marginTop:'30px', marginLeft:'100px',fontSize:'20px', width:'100px', height:'40px', borderRadius:'10px', }}>
                Register
              </button>
              </form>
              <NavLink to="/login" style={{fontSize:'20px', marginLeft:'-20px'}}>Already have an account?</NavLink>
            </div>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage style={{width:'500px', height:'700px', marginLeft:'45%',marginTop:'-75%', marginBottom:'10px'}}
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

export default Register;