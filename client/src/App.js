import { Router } from '@reach/router';
import './App.css';
import MainPage from './views/MainPage';
import GameDetails from './views/GameDetails';
import NewGame from './views/NewGame';
import EditGame from './views/EditGame';
import LoginReg from './views/LoginReg';
import UserProfile from './views/UserProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <LoginReg path='/' />
        <MainPage path='/games' />
        <GameDetails path='/games/:id' />
        <NewGame path='/games/new' />
        <EditGame path='/games/:id/edit' />
        <UserProfile path='/user/:id' />
      </Router>
    </div>
  );
}

export default App;
