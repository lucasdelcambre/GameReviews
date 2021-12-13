import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const login = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/login', 
                {
                    email: email,
                    password: password
                }, 
                { withCredentials: true })
            .then((res) => {
                localStorage.setItem('userId', res.data.userId);
                navigate('/games');
                // setReloadBoolean(!reloadBoolean);
            })
            .catch((err) => setErrorMsg(err.response.data.errors));
    };

    return(
        <div>
            <h2>Log In</h2>
            <form onSubmit={login}>
                <table>
                    <tr>
                        <td className='formLabel'>
                            <label>Email: </label>
                        </td>
                        <td className='formInput'>
                            <input 
                                type = 'text'
                                name = 'email'
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='formLabel'>
                            <label>Password: </label>
                        </td>
                        <td className='formInput'>
                            <input 
                                type = 'password'
                                name = 'password'
                                value = {password}
                                onChange = {(e) => setPassword(e.target.value)}
                            />
                        </td>
                    </tr>
                </table>
                {errorMsg ? (<span className='errorMsg'>{errorMsg}</span>) : null}
                <div className='center'>
                    <button type='submit'>Log in</button>
                </div>
            </form>
        </div>
    )
}

export default Login;