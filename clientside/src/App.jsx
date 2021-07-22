import React,{createContext ,useReducer} from 'react'
import './style/App.css'
import {  Route ,Switch } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Error from './components/Error.jsx';
import Logout from './components/Logout.jsx';

import {initialState , reducer} from './reducer/UseReducer.jsx'

    export const UserContext = createContext();

const App = () => {


    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className="appContainer" >
            
            <UserContext.Provider value={{state , dispatch}}>

                    <Navbar/>

                    
                    <Switch>

                        <Route exact path="/" >  <Home/> </Route>
                        <Route exact path="/about">  <About/> </Route>
                        <Route exact path="/contact">  <Contact/> </Route>
                        <Route exact path="/register">  <Register/> </Route>
                        <Route exact path="/login">  <Login/> </Route>
                        <Route exact path="/logout">  <Logout/> </Route>
                        <Route >  <Error/> </Route>
            
                    </Switch> 

                    <Footer/>

            </UserContext.Provider> 

        </div>
    )
}

export default App;
