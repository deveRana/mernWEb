import React,{useEffect ,useState} from 'react'
import '../style/About.css'
import commonImage from '../images/user-picture.png'
import riteshImg   from '../images/riteshImg.jpg'
import samaImg   from '../images/samaImg.jpg'
import mahiImg   from '../images/mahiImg.jpg'
import sagarImg   from '../images/sagarImg.jpg'
import { FaUserTie } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { AiFillCode } from "react-icons/ai";
import { useHistory } from "react-router-dom";


const About = () => {


    const [userData, setUserData] = useState({})
    const [userImg, setUserImg] = useState(commonImage)

    const history = useHistory();

    const callAboutPage = async ()=>{

        try{
            const res = await fetch('/getData' , {
            method: "GET",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            credentials : "include"
        })

            const data = await res.json();

            setUserData(data);

            if(data.email === "ritesh@gmail.com"){
                setUserImg(riteshImg)
            }
            else if(data.email === "mahi@gmail.com"){
                setUserImg(mahiImg)
            }
            else if(data.email === "sama@gmail.com"){
                setUserImg(samaImg)
            }
            else if(data.email === "sagar@gmail.com"){
                setUserImg(sagarImg)
            }

       }catch(err){
           console.log(err)
           history.push('./login')
       } 

    };


   

    useEffect(() => {
        callAboutPage();
    }, [])

    return (
        <div className="aboutContainer" >
                
            <div className="aboutInnerDiv" >

                    <div className="leftInnerDiv" >
                        <img src={userImg} alt=""  />
                    </div>

                    <div className="rightInnerDiv" >
                            <div className="upperRightDiv">
                                    <h2> {userData.name} </h2>
                            </div>

                            <div className="lowerRightDiv">

                                <div className="aboutDiv">
                                <p>About :- </p>                           
                                </div>

                                <div className="userDeatailsDiv">
                               
                                    <div className="userCategory">
                                   <p>Name</p> <h4> <FaUserTie/> </h4>
                                        <p>Email</p> <h4> <MdEmail/> </h4>
                                        <p>Phone</p> <h4> <MdPhone/> </h4>
                                        <p>Profession</p> <h4> <MdWork/> </h4>
                                        <p>User-ID</p> <h4> <AiFillCode/> </h4>
                                    </div>

                                    <div className="userInfo">
                                        <p>{userData.name}</p>
                                        <p>{userData.email}</p>
                                        <p>{userData.number}</p>
                                        <p>{userData.profession}</p>
                                        <p>{userData._id}</p>
                                    </div>

                                </div>

                            </div>

                    </div>

            </div>

        </div> 
    )
}

export default About;
