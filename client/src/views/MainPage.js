import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Header from '../components/Header';

const MainPage = (props) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: ''
    })
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${localStorage.getItem("userId")}`)
            .then((res) => setUser({
                firstName: res.data.firstName,
                lastName: res.data.lastName
            }))
            .catch((err) => console.log(err))

        axios.get('http://localhost:8000/api/games')
            .then((res) => {
                let newGameList = [...res.data];
                newGameList.sort((game1, game2) => {
                    if(game1.avgRating < game2.avgRating){return 1;}
                    if(game1.avgRating > game2.avgRating){return -1;}
                    return 0;
                });
                setGameList(newGameList);
            })
            .catch((err) => console.log(err));
    }, []);

    return(
        <div>
            <Header firstName={user.firstName} lastName={user.lastName}/>
            <h2>All games</h2>
            <table className='gameList'>
                <thead>
                    <tr>
                        <td>Game title</td>
                        <td>Rating</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        gameList ? gameList.map((game, index) => (
                            <tr key={index}>
                                <td className='gameTableItemName'><Link to={`/games/${game._id}`}>{game.title}</Link></td>
                                <td className='gameTableItemRating'>{game.avgRating}</td>
                            </tr>
                        ))
                        :null
                    }
                </tbody>
            </table>
            <Link to='/games/new'>Review an unlisted game</Link>
        </div>
    )
}

export default MainPage;