import React,{useState} from "react";
import "../style/Register.css";
import { FaUserTie } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {


    const [value, setValue] = useState({
        name:"",
        email:"",
        number:"",
        password:"",
        cPassword:"",
        profession:""
    })

    const History = useHistory();
    let name , inputValue;

    const handleInput = (e)=>{

        name = e.target.name;
        inputValue = e.target.value;

        setValue( {...value , [name]:inputValue } )

    };

    const registerEvent = async (e)=>{

        e.preventDefault();
        console.log("I am Clicked")


        const { name,email,number,password,cPassword,profession } = value;
        

        const res = await fetch('/register' , {

          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            name,email,number,password,cPassword,profession
          })

        });

        const data = await res.json();

        if(res.status === 422 || !data ){
          toast.error('Invalid Registration', {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          console.log("Invalid Registration")
       }
       else{
        toast.success('Registration Succesfull ', {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        console.log("Succesfull Registration")
        setValue({});
          setTimeout(() => {
            History.push('./login');
          }, 1500);
      };
    }
  
  return (
    <div className="registerContainer">
      <div className="registerInnerDiv">
        <h3>Register</h3>

        <form method="post" onSubmit={registerEvent}  >
          <label htmlFor="Name">
            <FaUserTie />
          </label>
          <input
            name="name"
            type="text"
            autoCorrect="off"
            autoComplete="off"
            autoFocus="off"
            autoSave="off"
            placeHolder="Your Name"
            onChange={handleInput}
            value={value.name}
          />
          <hr />

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
            onChange={handleInput}
            value={value.email}
          />
          <hr />

          <label htmlFor="Number">
            <MdPhone />
          </label>
          <input
            name="number"
            type="number"
            autoCorrect="off"
            autoComplete="off"
            autoFocus="off"
            autoSave="off"
            placeHolder="Your Number"
            onChange={handleInput}
            value={value.number}
          />
          <hr />

          <label htmlFor="Password">
          <RiLockPasswordLine />
          </label>
          <input
            name="password"
            type="password"
            autoCorrect="off"
            autoComplete="off"
            autoFocus="off"
            autoSave="off"
            placeHolder="Password"
            onChange={handleInput}
            value={value.password}
          />
          <hr />

          <label htmlFor="Password">
           <RiLockPasswordFill />
          </label>
          <input
            name="cPassword"
            type="password"
            autoCorrect="off"
            autoComplete="off"
            autoFocus="off"
            autoSave="off"
            placeHolder="Confirm Password"
            onChange={handleInput}
            value={value.cPassword}
          />
          <hr />

          <label htmlFor="Profession">
            <MdWork />
          </label>
          <input
            name="profession"
            type="text"
            autoCorrect="off"
            autoComplete="off"
            autoFocus="off"
            autoSave="off"
            placeHolder="Your Profession"
            onChange={handleInput}
            value={value.profession}
          />
          <hr />

          <button type="submit" >Register</button>
            <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Register;
