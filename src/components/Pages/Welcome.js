import React,{Fragment} from 'react'
import styles from './Welcome.module.css'
import { Link } from 'react-router-dom'

import Profile from './Profile'

function Welcome() {
  return (
    <Fragment>
    <div className={styles.welcome_container}>
    <div>Welcome To Expense Tracker App</div>
    <div> <p>Your Profile is Incomplete. <Link to='/profile'>Complete Now</Link> </p> </div>
    </div>
    </Fragment>
  )
}

export default Welcome