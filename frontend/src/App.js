
import { Route, Routes } from 'react-router-dom';
import HomePage  from './Pages/HomePage';
import ChatPage  from './Pages/ChatPage';
import "./App.css"
import SignupForm from './components/Authentication/Signup';
import LoginPage from './components/Authentication/Login';

function App() {
  return (
    <div className="App" bg="white">
      <Routes>

      {/* <Route path="/login" component={LoginPage} exact /> */}
      <Route exact path="/" Component={HomePage}  />
      <Route exact path="/chats" Component={ChatPage}  />
      {/* <Route path="/signup" component={SignupForm} exact /> */}
      </Routes>
    </div>
  );
}

export default App;
