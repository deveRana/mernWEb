import React,{useEffect,useContext} from 'react'
import '../style/logout.css';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from "../App.jsx";

const Logout = () => {

    
    const {state , dispatch} = useContext(UserContext)


    const history = useHistory();

    const callLogoutPage = async ()=>{

       try{


        const res = await fetch('logout',{
            method: "GET",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            credentials : "include"
        })

        const data = await res.json();

        console.log("I am Data")
        
        dispatch({type:'USER' , payload:false})
 
        toast.success('SuccesFull Logout', {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

        setTimeout(() => {
            history.push('/login');
        }, 1500);

      

       }catch(err){
           console.log(err)
       }

    }


    useEffect(() => {
        callLogoutPage();
    }, [])


    return (
        <div className="logoutConainer">
         
             <ToastContainer />
        </div>
    )
}

export default Logout;
