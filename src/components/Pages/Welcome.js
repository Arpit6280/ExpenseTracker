import React,{Fragment, useContext} from 'react'
import styles from './Welcome.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import AuthContext from '../../store/auth-context';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Expenses from '../Expenses';


function Welcome(props) {
    const authCtx=useContext(AuthContext)
    const navigate= useNavigate()
    const verifyEmailHandler=async()=>{
        try{
     const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_o7vD1dv2xerksf4mLLdbKjlKU8zRKQw',{
        method:'POST',
        body:JSON.stringify({
            idToken:authCtx.token,
            requestType: "VERIFY_EMAIL"
        })
      })
      if (response.ok) {
        let data = await response.json();
        console.log(data.email);
      } else {
        response.json().then((data) => {
          //show an error modal
          alert(data.error.message);
        });
      }
    }catch{
        console.log('Error while verifying Email');
    }
      
    }
    const logoutHandler=()=>{
        authCtx.logout()
   navigate('/login',{replace:true})
    }
  return (
    <Fragment>
    <div className={styles.welcome_container}>
    <div>Welcome To Expense Tracker App</div>
    <div> <Button variant="danger" onClick={logoutHandler} className={styles.btn} >Logout</Button> <p>Your Profile is Incomplete. <Link to='/profile'>Complete Now</Link> </p> <Button variant="warning" onClick={verifyEmailHandler}>Verify Email</Button>  </div>
    </div>
    <Button className='text-center' onClick={()=>{props.showExpenseForm()}}>Add Expenses</Button>
      <div className={styles.table}>
     <Row >
      <Col className='fw-bold'>Description</Col>
      <Col className='fw-bold'>Category</Col>
      <Col className='fw-bold'>Date</Col>
      <Col className='fw-bold'>Price</Col>
     </Row>
     <hr />
    {/* <ul className=''> */}
    {props.expenses.map((item)=>(
      <Expenses key={item.id} description={item.description} price={item.price} date={item.date} category={item.category} />
      // <li>{item.description} {item.price} {item.date} {item.category} </li>
    ))}
    </div>
    {/* </ul> */}
    </Fragment>
  )
}

export default Welcome