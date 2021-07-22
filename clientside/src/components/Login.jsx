import React , {useState,useContext} from 'react'
import '../style/Login.css'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";

import {UserContext} from '../App.jsx'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {

  const {state , dispatch} = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const History = useHistory();
    const loginEvent = async (e)=>{

      e.preventDefault();
      console.log("I am Clicked");

      try{
        const res = await fetch('/login' , {

          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            email ,password
          })
 
        });

      const data = await res.json();

      if(res.status !== 422  ){
        toast.success('Login SuccesFull', {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        dispatch({type:'USER' , payload:true})
        console.log("Succesfull Login")
        setTimeout(() => {
          History.push('./');
        }, 1500);
      }else{
         toast.error(' Invalid Login ', {
           position: "top-center",
           autoClose: 1300,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           });
           console.log("Invalid Login")
       }
      

      }catch(err){
        console.log(err)
      }

    };


    return (
      <>
        <div className="loginContainer" >
   


            <div className="logInInnerDiv">
            <h3>Log In</h3>
        
            <form method="post" >
                    
           <label htmlFor="Email">
           <MdEmail />
           </label>
          <input
            name="email"
            type="email" 
            autoCorrect="off"
            autoComplete="off"
            autoFocus="off"
            autoSave="off"
            placeHolder="Your Email"
            onChange={ (e)=>{ setEmail(e.target.value) } }
            value={email}
          />
          <hr />

          <label htmlFor="Password">
          <RiLockPasswordFill/>
          </label>
          <input
            name="password"
            type="password"
            autoCorrect="off"
            autoComplete="off"
            autoFocus="off"
            autoSave="off"
            placeHolder="Password"
           onChange={ (e)=>{ setPassword(e.target.value) } }
            value={password}
          />
          <hr />

            <button  onClick={loginEvent} >Login</button>
                 <ToastContainer />
            </form>
            </div>


        </div>
        </>
    ) 
}

export default Login
