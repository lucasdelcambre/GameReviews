import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Header from '../components/Header';

const UserProfile = (props) => {
    const { id } = props;
    const [loggedInUser, setLoggedInUser] = useState({
        firstName: '',
        lastName: ''
    })
    const [profileUser, setProfileUser] = useState({
        firstName: '',
        lastName: ''
    })
    const [submittedGames, setSubmittedGames] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${localStorage.getItem("userId")}`)
            .then((res) => setLoggedInUser({
                firstName: res.data.firstName,
                lastName: res.data.lastName
            }))
            .catch((err) => console.log(err))

        axios.get(`http://localhost:8000/api/users/${id}`)
            .then((res) => setProfileUser({
                firstName: res.data.firstName,
                lastName: res.data.lastName
            }))
            .catch((err) => console.log(err))

        axios.get(`http://localhost:8000/api/games/user/${id}`)
            .then((res) => {
                setSubmittedGames(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return(
        <div>
            <Header firstName={loggedInUser.firstName} lastName={loggedInUser.lastName} />
            <span><Link to='/games'>Back to games</Link></span><br />
            <h2>{profileUser.firstName} {profileUser.lastName}'s Profile</h2>
            <h3>Submitted Reviews ({submittedGames.length}): </h3>
            {
                submittedGames ? submittedGames.map((game, index) => (
                    <div key={index}>
                        <h4>{index + 1}. {game.title}</h4>
                    </div>
                ))
                : <p>None!</p>
            }
        </div>
    )
};

export default UserProfile;