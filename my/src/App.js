import {app } from './firebaseconfig';
import { useEffect, useState} from 'react'
// import {collection , addDoc, getDocs, onSnapshot , query , where} from 'firebase/firestore' 
// import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth";


function App() {

  const auth = getAuth();

  const [data,setdata] = useState();

  const handleinput = (event) =>
  {
     let newinput  = {[event.target.name] : event.target.value}
     setdata({...data,...newinput})
  }

  const handlesubmitsignup = (event) =>
  {
    
    createUserWithEmailAndPassword(auth,data.email, data.password)
    .then((userCredential) => {
      // Signed up 
      console.log(data);
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // ..
    });
  }

  const handlelogout = (event) =>
  {
    signOut(auth);
  }

  useEffect(()=>{
    onAuthStateChanged(auth ,(data)=>
    {
        if(data)
        {
            console.log(data.email + 'LOGGED IN')
        }
        else
        {
          console.log("login to start using this web page")
        }
    })
  })

  const handlelogin = (event) =>
  {
    
    signInWithEmailAndPassword(auth,data.email , data.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
     })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }



  return <div>
     <div>
    <h1>SIGN UP</h1>
    {/* <input type = "text" name = "username" placeholder ="Enter your username" onChange =  {(event)=>{handleinput(event)}}/> */}
    <input type = "email" name = "email" placeholder ="Enter your Email" onChange = {(event)=>{handleinput(event)}} />
    <input type = "password" name = "password" placeholder ="Enter your password" onChange =  {(event)=>{handleinput(event)}}/>
    <button onClick = {handlesubmitsignup}>Sign Up</button>
    </div>

    <div> 
     <h1>LOG IN</h1>
    <input type = "email" name = "email" placeholder ="Enter your Email"  onChange = {(event)=>{handleinput(event)}}/>
     <input type = "password" name = "password" placeholder ="Enter your password"  onChange = {(event)=>{handleinput(event)}}/>
     <button onClick = {handlelogin}>Login</button>
   <button onClick = {handlelogout}>Logout</button>
    </div> 



    </div>
}

 export default App;

// "password " is wrong
// "password" is right