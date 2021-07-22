const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    number :{
        type:Number,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    cPassword:{
        type:String,
        required:true
    },

    profession:{
        type:String,
        required:true
    },

    date:{
        type:String,
        default:Date.now
    },

    messages:[
        {

            message:{
                type:String,
                required:true
            }

        },
    ],
     
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]


})

// Hasing the Passwords
userSchema.pre('save' , async function(next){

    if(this.isModified('password')){
        console.log("Hasing The Password")
        this.password = await bcrypt.hash(this.password ,12)
        this.cPassword = await bcrypt.hash(this.cPassword ,12)
    }
    next();
})

// Generating The Tokens
userSchema.methods.generateAuthToken = async function(){

    console.log("I am Token")

    try{
       
       
        let token = jwt.sign({_id:this._id} , process.env.SECRET_KEY);
   

        // console.log(this.name)
        this.tokens = this.tokens.concat({token:token});

        await this.save();
        
        return token;
 
    }catch(err){
        console.log(err);
    }

}

// Adding a Message
userSchema.methods.addMessage = async function(message){

    console.log("Adding a Message")

    try{

        this.messages = this.messages.concat({ message })
        await this.save();
        console.log("Message Send")
        return this.messages;

    }catch(err){
        console.log(err)
    }

}






const User =  mongoose.model( 'User' , userSchema )


module.exports = User;