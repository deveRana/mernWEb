import React,{useState , useEffect} from 'react'
import '../style/Home.css'


const Home = () => {

    
    const [welcomeName, setWelcomeName] = useState("We are Mern Developers")


    const callHomePage = async ()=>{

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

            setWelcomeName(data.name);

       }catch(err){
           console.log(err)
       }


    };

    useEffect(() => {
        callHomePage();
    }, [])

    return (
        <div className="homeContainer" >
            
            <div className="innerDiv">

            <h1>Welcome</h1>
            <p>{welcomeName}</p>

            </div>

        </div>
    )
}

export default Home;
