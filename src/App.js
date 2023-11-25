import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Registration from './components/Pages/Registration';
import Login from "./components/Pages/Login";
import Welcome from "./components/Pages/Welcome";
import Profile from "./components/Pages/Profile";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
// import Login from './components/Pages/Registration';

function App() {
  const authCtx=useContext(AuthContext)
  return (
    <BrowserRouter>
    <Routes>
   {authCtx.isLoggedIn &&  <Route path="/" element={<Welcome/>}/>}
    {authCtx.isLoggedIn && <Route path="/profile" element={<Profile/>} />} 
    <Route path="/registration" element={<Registration/>} />
    <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
