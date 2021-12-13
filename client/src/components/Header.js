import axios from 'axios';
import { navigate, Link } from '@reach/router';

const Header = (props) => {
    const {firstName, lastName} = props;

    const logout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/logout', {withCredentials: true})
            .then((res) => {
                console.log("logging out");
                localStorage.removeItem('userId');
                navigate('/');
                console.log("logged out");
            })
            .catch((err) => console.log(err));
    }

    return(
        <div>
            <h1>Game Reviews</h1>
            <span>
                Logged in as <Link to={`/user/${localStorage.getItem("userId")}`}>{firstName} {lastName}</Link> | <span className='clickable' onClick={logout}>Log out</span>
            </span><br />
        </div>
    )
}

export default Header;