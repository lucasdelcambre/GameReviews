import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Header from "../components/Header";

const GameDetails = (props) => {
    const { id } = props;
    const [game, setGame] = useState([]);
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: ''
    })
    const [submitter, setSubmitter] = useState({
        id: '',
        firstName: '',
        lastName: ''
    })
    const [reviews, setReviews] = useState([]);
    const [reviewedByUser, setReviewedByUser] = useState(false);
    const [formReview, setFormReview] = useState('');
    const [formRating, setFormRating] = useState(0);
    const [formReviewObjId, setFormReviewObjId] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        // Get the data for the currently logged in user
        axios.get(`http://localhost:8000/api/users/${localStorage.getItem("userId")}`)
            .then((res) => {
                setUser({
                    id: res.data._id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });

                // Get the data for the requested game
                axios.get(`http://localhost:8000/api/games/${id}`)
                    .then((res) => {
                        setGame(res.data);
                        setSubmitter({
                            id: res.data.createdBy._id,
                            firstName: res.data.createdBy.firstName,
                            lastName: res.data.createdBy.lastName
                        });

                        // Get all the reviews for the current game
                        axios.get(`http://localhost:8000/api/reviews/game/${id}`)
                            .then((res) => {
                                setReviews(res.data);
                                // Check each review for the current game to see if one was posted by logged in user
                                for(let i = 0; i < res.data.length; i++){
                                    if(res.data[i].createdBy._id === localStorage.getItem("userId")){
                                        setReviewedByUser(true);
                                        setFormReviewObjId(res.data[i]._id);
                                        setFormReview(res.data[i].review);
                                        setFormRating(res.data[i].rating);
                                        break;
                                    }
                                }
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [id, reviewedByUser])

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/games/${id}`, {withCredentials: true})
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate('/games');
            })
            .catch((err) => console.log(err));
    }

    const submitNewHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/reviews/',
            {
                review: formReview,
                rating: formRating,
                game: game._id
            }, {withCredentials: true})
            .then((res) => {
                console.log(res);
                setReviewedByUser(true);
                axios.get(`http://localhost:8000/api/reviews/game/${game.id}/rating`)
                    .then()
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors);
            });
    }

    const submitUpdateHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/reviews/${formReviewObjId}`,
            {
                review: formReview,
                rating: formRating
            }, {withCredentials: true})
            .then((res) => {
                console.log(res);
                setReviewedByUser(false);
                setReviewedByUser(true);
                axios.get(`http://localhost:8000/api/reviews/game/${game._id}/rating`)
                    .then()
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors);
            });
    }

    return(
        <div>
            <Header firstName={user.firstName} lastName={user.lastName} />
            <span><Link to='/games'>Back to games</Link></span><br />
            <h2>Details about {game.title}:</h2>
            <div className='gameDetails'>
                <p className='gameDetailsItem'>Description: </p>
                <p className='gameDetailsItemContent'>{game.description}</p>
                <p className='gameDetailsItem'>Rating: {game.avgRating}</p>
                <p className='gameDetailsItem'>Submitted by: <Link to={`/user/${submitter.id}`}>{submitter.firstName} {submitter.lastName}</Link></p>
            </div>
            <button onClick={deleteHandler}>Delete</button> | <Link to={`/games/${id}/edit`}>Edit game</Link>
            {
                reviewedByUser? 
                    <div>
                        <h3>Edit your review:</h3>
                        <form onSubmit={submitUpdateHandler}>
                            <div>
                                <label>Rating: {formRating}</label>
                                <input
                                    onChange={(e) => setFormRating(e.target.value)}
                                    value={formRating}
                                    name='rating'
                                    type='range'
                                    min='0'
                                    max='10'
                                    step='1'
                                />
                            </div>
                            { errors.review ? <span className='errorMsg'>{errors.review.message}</span> : <br /> }
                            <textarea
                                onChange={(e) => setFormReview(e.target.value)}
                                value={formReview}
                                name='review'
                            /><br />
                            <button type='submit'>Update</button>
                        </form>
                    </div>
                    :
                    <div>
                        <h3>Review this game:</h3>
                        <form onSubmit={submitNewHandler}>
                            <div>
                                <label>Rating: {formRating}</label>
                                <input
                                    onChange={(e) => setFormRating(e.target.value)}
                                    value={formRating}
                                    name='rating'
                                    type='range'
                                    min='0'
                                    max='10'
                                    step='1'
                                />
                            </div>
                            { errors.review ? <span className='errorMsg'>{errors.review.message}</span> : <br /> }
                            <textarea
                                onChange={(e) => setFormReview(e.target.value)}
                                value={formReview}
                                name='review'
                            /><br />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
            }
            
            <h2>{reviews.length} Reviews for {game.title}:</h2>
            {
                reviews ? reviews.map((review, index) => (
                    <div key={index} className='review'>
                        <span>{review.createdBy.firstName} {review.createdBy.lastName} says: </span><br />
                        <span>Rating: {review.rating}</span><br />
                        <p>{review.review}</p>
                    </div>
                ))
                : null
            }
        </div>
    )
};

export default GameDetails;