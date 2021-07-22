import React,{useState , useEffect} from 'react'
import '../style/Contact.css'
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

    const [userData, setUserData] = useState({})
    const [message, setMessage] = useState("")

    const history = useHistory();

    const callContactPage = async ()=>{

        try{

            const res = await fetch('/getData' ,{
                method: "GET",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })
    
            const data = await res.json();

            setUserData(data);

           

        }catch(err){
            console.log(err)
            history.push('./login')
        }

    }

    const submitMessage = async ()=>{
 
        console.log("Clicked")
 
      try{ 
        const res = await fetch('/contact' , {
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              message
            })
        })

        const data = await res.json();

        if(res.status === 402 || !data){
            toast.error('Write a Message Before Submit', {
                position: "top-center",
                autoClose: 1300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            console.log("Write a Message Before Submit")
        }else{
            toast.success('Message Sent Succesfully', {
                position: "top-center",
                autoClose: 1300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            console.log("Message Sent Succesfully")
            setMessage("");
        }

      }catch(err){
          console.log(err)
      }




    }

    useEffect(() => {
        callContactPage();
    }, [])


    return (
        <div className="contactContainer" >
            
            <div className="innerContactContainer" >

                    <div className="headingDiv">
                        <h1> Get in Touch </h1>
                    </div>

                    <div className="upperInnerDiv" >
                        <input type="text" value={userData.name} />
                        <input type="text" value={userData.email} className="emailInput" />
                        <input type="number" value={userData.number} />
                    </div>

                    <div className="lowerInnerDiv" >
                    <textarea name="textArea" placeHolder="Message" value={message} onChange={ (e)=>{setMessage(e.target.value)} } autoCorrect="off" autoFocus="off" autoComplete="off"  >
                    </textarea >
                    </div>

                    <div className="buttonContainer">
                        <button onClick={submitMessage} >Submit</button>
                        <ToastContainer />
                    </div>

            </div>

        </div>
    )
}

export default Contact
