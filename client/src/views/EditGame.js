import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Header from '../components/Header';

const EditGame = (props) => {
    const { id } = props;

    const [user, setUser] = useState({
        firstName: '',
        lastName: ''
    })
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${localStorage.getItem("userId")}`)
            .then((res) => setUser({
                firstName: res.data.firstName,
                lastName: res.data.lastName
            }))
            .catch((err) => console.log(err))

        axios.get(`http://localhost:8000/api/games/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description);
            })
            .catch((err) => console.log(err))
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/games/${id}`, {
            title,
            description
        }, {withCredentials: true})
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate(`/games/${id}`);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div>
            <Header firstName={user.firstName} lastName={user.lastName} />
            <Link to='/games'>Back to games</Link>
            <h2>Edit {title}</h2>
            <form onSubmit={submitHandler}>
            <label>Title: </label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name='title'
                    type='text'
                />
                { errors.title ? <p className='errorMsg'>{errors.title.message}</p> : <br />}
                { errors.uniqueTitleError ? <p className='errorMsg'>{errors.uniqueTitleError}</p> : null}
                <br />

                <label>Description: </label>
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    name='description'
                    type='text'
                />
                { errors.description ? <p className="errorMsg">{errors.description.message }</p> : <br /> }
                <br />

                <button>Update Game</button>
            </form>
        </div>
    )
}

export default EditGame;