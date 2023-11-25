import React,{Fragment, useContext} from 'react'
import styles from './Welcome.module.css'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import Profile from './Profile'
import AuthContext from '../../store/auth-context';

function Welcome() {
    const authCtx=useContext(AuthContext)
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
  return (
    <Fragment>
    <div className={styles.welcome_container}>
    <div>Welcome To Expense Tracker App</div>
    <div> <p>Your Profile is Incomplete. <Link to='/profile'>Complete Now</Link> </p> <Button variant="warning" onClick={verifyEmailHandler}>Verify Email</Button>  </div>
    </div>
    </Fragment>
  )
}

export default Welcome