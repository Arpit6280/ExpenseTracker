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
import { Fragment, useContext, useState } from "react";
import AuthContext from "./store/auth-context";
import ForgotPassword from "./components/Pages/ForgotPassword";
import AddExpense from "./components/AddExpense";
// import Login from './components/Pages/Registration';

function App() {
  const [isExpense,setIsExpense]=useState(false)
  const [expenses,setExpenses]=useState([]);

  const addExpenses=(expense)=>{
    setExpenses((prevState)=> {return[...prevState,expense]})
  }
  const showExpenseForm=()=>{
    console.log('ll');
      setIsExpense(true)
  }
  const closeExpenseForm=()=>{
    setIsExpense(false)
}
  const authCtx=useContext(AuthContext)
  return (
    <Fragment>
    <BrowserRouter>
    <Routes>
   {authCtx.isLoggedIn &&  <Route path="/" element={<Welcome showExpenseForm={showExpenseForm} expenses={expenses}/>}/>}
    {authCtx.isLoggedIn && <Route path="/profile" element={<Profile/>} />} 
    <Route path="/registration" element={<Registration/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/forgetPassword" element={<ForgotPassword/>}/>
    </Routes>

    </BrowserRouter>
    {isExpense && <AddExpense addExpenses={addExpenses} closeExpenseForm={closeExpenseForm}/>}
    </Fragment>
  );
}

export default App;
