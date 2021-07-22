import React from 'react'
import ErrorImg from '../images/404-error.png'
import '../style/Error.css'

const Error = () => {
    return (
        <div className="errorContainer" >
        
                <div className="innerErrorDiv">
                    <img src={ErrorImg} alt="" />
                </div>

        </div>
    )
}

export default Error;
