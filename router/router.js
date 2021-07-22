const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Getting MiddleWare
const authenticate = require('../middleware/authenticate.js')

// Getting Database Connection
require('../db/connection.js')

// Getting User Schema
const User = require('../model/userSchema.js')



 
router.get('/' , (req ,res)=>{
    console.log("I am Home")
})

router.get('/about' , (req ,res)=>{
    console.log("I am Home")
})

router.post('/contact', authenticate , async (req ,res)=>{
    
    console.log("I am Contact")

    const {message} = req.body;

    if(!message){
        console.log("Write a Message Before Submit")
        res.status(402).json({error:"Write a Message Before Submit"})
    }

    try{

        const userContact = await User.findOne({_id:req.userID})

        if(userContact){

            const userMessage = await userContact.addMessage(message);

            await userContact.save();

            res.status(201).json({message:"Message Sent Succesfully"})
        }


    }catch(err){
        console.log(err);
    }

})



router.get('/getData' , authenticate , (req ,res)=>{
    console.log("I am Get Data");
    res.send(req.rootUser)
})




router.post('/login' , async (req ,res)=>{
  
    console.log("I am Login")

    let token;
    const {email , password} = req.body

    if(!email || !password){
        console.log("Please Fill the Input Filled")
        return res.status(422).json({ error:"Please Fill the Input Filled" })
    }

    try{

        const userExist = await User.findOne({email:email})

        if(userExist){

            const passwordMatch = await bcrypt.compare( password , userExist.password )

            token = await userExist.generateAuthToken();
            console.log(token)

            res.cookie("jwtToken" ,token ,{
                expires: new Date(Date.now() + 86400000),
                httpOnly:true
            } )


            if(passwordMatch){
                console.log("Login Succesfully")
                res.status(201).json({ message:"Login Succesfully" })
            }else{
                console.log("Password is Wrong")
                res.status(201).json({ message:"Email or Password is Wrong" })
            }

        }else{
            console.log("User Doesn't Exist")
            res.status(422).json({error:"Check Email or Password Again"})
        }

    }catch(err){
        console.log(err)
    }


})




router.post('/register' , async (req ,res)=>{
    
    console.log("I am Register")

    const { name ,email ,number ,password ,cPassword ,profession } = req.body

    if( !name || !email || !number || !password || !cPassword || !profession ){
        console.log("Please Fill The Input Filled")
        return res.status(422).json( { error:"Please Fill The Input Filled" } )
    }

    try{

        const userExist = await User.findOne({email:email})

        if(userExist){
            console.log("User Already Exists")
            return res.status(422).json({error:"User Already Exists"})
        }else if(password !== cPassword){
            console.log("Password Doesn't Match")
            return res.status(422).json( { error : "Password Doesn't Match" } )
        }else{

            const user = new User({ name ,email ,number ,password ,cPassword ,profession })

            // Hasing The Passwords

            const userRegister = await user.save();

            if(userRegister){
                console.log("User Registered Succesfully")
                res.json({ message:"User Registered Succesfully" })
            }

        }


    }catch(err){
        console.log(err)
    }


})


router.get('/logout' , authenticate ,  (req, res)=>{

    console.log("I am Logout")
    res.clearCookie('jwtToken', { path : '/' })
    console.log("User Logout SuccesFully")
    return res.json({message:"User registered Succesfully"})

})


module.exports = router;