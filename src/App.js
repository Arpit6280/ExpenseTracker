import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Registration from './components/Pages/Registration';
import Login from "./components/Pages/Login";
import Welcome from "./components/Pages/Welcome";
// import Login from './components/Pages/Registration';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Welcome/>}/>
    <Route path="/registration" element={<Registration/>} />
    <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
