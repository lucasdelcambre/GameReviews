import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const LoginReg = (props) => {
    return(
        <div>
            <h1>Welcome to Game Reviews</h1>
            <p>Please log in or register an account.</p>
            <Login />
            <Register />
        </div>
    )
}
export default LoginReg;