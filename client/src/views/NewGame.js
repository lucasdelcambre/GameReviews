import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Header from "../components/Header";

const NewGame = (props) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: ''
    })
    const [gameList, setGameList] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${localStorage.getItem("userId")}`)
            .then((res) => setUser({
                firstName: res.data.firstName,
                lastName: res.data.lastName
            }))
            .catch((err) => console.log(err))

        axios.get('http://localhost:8000/api/games')
            .then((res) => {
                console.log(res.data);
                setGameList(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        let gameIsUnique = true;
        gameList.forEach((game) => {
            if(game.title === title) {
                gameIsUnique = false;
            }
        })

        if(gameIsUnique) {
            axios.post('http://localhost:8000/api/games', {
                title,
                description,
                rating
            }, {withCredentials: true})
                .then((res) => {
                    axios.post('http://localhost:8000/api/reviews', {
                        review: review,
                        rating: rating,
                        game: res.data._id
                    }, {withCredentials: true})
                        .then((res) => {
                            navigate('/games');
                        })
                        .catch((err) => {
                            console.log(err);
                            setErrors(err.response.data.errors);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    setErrors(err.response.data.errors);
                });
        } else {
            setErrors(...errors, {uniqueTitleError: "Game title must be unique."})
        }
    }

    return(
        <div>
            <Header firstName={user.firstName} lastName={user.lastName} />
            <Link to='/games'>Back to games</Link>
            <h2>Add a new game to the database:</h2>
            <form onSubmit={submitHandler}>
                <table>
                    <tr>
                        <td className='formLabel'>
                            <label>Title: </label>
                        </td>
                        <td className='formInput'>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                name='title'
                                type='text'
                            />
                        </td>
                    </tr>
                </table>
                { errors.title ? <span className='errorMsg'>{errors.title.message}</span> : null}
                { errors.uniqueTitleError ? <span className='errorMsg'>{errors.uniqueTitleError}</span> : null}
                <table>
                    <tr>
                        <td className='formLabel'>
                            <label>Description: </label>
                        </td>
                        <td className='formInput'>
                            <input
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                name='description'
                                type='text'
                            />
                        </td>
                    </tr>
                </table>
                { errors.description ? <span className='errorMsg'>{errors.description.message}</span> : null }
                <table>
                    <tr>
                        <td className='formLabel'>
                            <label>Rating: {rating}</label>
                        </td>
                        <td className='formInput'>
                            <input
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                name='rating'
                                type='range'
                                min='0'
                                max='10'
                                step='1'
                            />
                        </td>
                    </tr>
                </table>
                { errors.review ? <span className='errorMsg'>{errors.review.message}</span> : null }
                <label>Review: </label><br />
                <textarea
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    name='review'
                /><br />
                <button>Add and review Game</button>
            </form>
        </div>
    )
}

export default NewGame;