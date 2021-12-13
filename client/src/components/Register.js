import React, { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', user, { withCredentials: true })
            .then((res) => {
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

                setConfirmReg('Thank you for registering. You can now log in.');
                setErrors({});
            })
            .catch((err) => setErrors(err.response.data.errors));
    };

    return(
        <div>
            <h2>Register</h2>
            {confirmReg ? <h4 style={{ color: 'lightgreen' }}>{confirmReg}</h4> : null}
            <form onSubmit={register}>
                <table>
                    <tr className='formItem'>
                        <td className='formLabel'>
                            <label>First name: </label>
                        </td>
                        <td className='formInput'>
                            <input 
                                type = 'text'
                                name = 'firstName'
                                value = {user.firstName}
                                onChange = {handleChange}
                            />
                        </td>
                    </tr>
                </table>
                {errors.firstName ? <span className='errorMsg'>{errors.firstName.message}</span> : null}
                <table>
                    <tr>
                        <td className='formLabel'>
                            <label>Last name: </label>
                        </td>
                        <td className='formInput'>
                            <input 
                                type = 'text'
                                name = 'lastName'
                                value = {user.lastName}
                                onChange = {handleChange}
                            />
                        </td>
                    </tr>
                </table>
                {errors.lastName ? <span className='errorMsg'>{errors.lastName.message}</span> : null}
                <table>
                    <tr>
                        <td className='formLabel'>
                            <label>Email: </label>
                        </td>
                        <td className='formInput'>
                            <input 
                                type = 'text'
                                name = 'email'
                                value = {user.email}
                                onChange = {handleChange}
                            />
                        </td>
                    </tr>
                </table>
                {errors.email ? <span className='errorMsg'>{errors.email.message}</span> : null}
                <table>
                    <tr>
                        <td className='formLabel'>
                            <label>Password: </label>
                        </td>
                        <td className='formInput'>
                            <input 
                                type = 'password'
                                name = 'password'
                                value = {user.password}
                                onChange = {handleChange}
                            />
                        </td>
                    </tr>
                </table>
                {errors.password ? <span className='errorMsg'>{errors.password.message}</span> : null}
                <table>
                    <tr>
                        <td className='formLabel'>
                            <label>Confirm password: </label>
                        </td>
                        <td className='formInput'>
                            <input 
                                type = 'password'
                                name = 'confirmPassword'
                                value = {user.confirmPassword}
                                onChange = {handleChange}
                            />
                        </td>
                    </tr>
                </table>
                {errors.confirmPassword ? <span className='errorMsg'>{errors.confirmPassword.message}</span> : null}
                <div className='center'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
};

export default Register;