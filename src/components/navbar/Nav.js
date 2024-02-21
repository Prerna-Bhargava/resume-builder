import React from 'react'
import styles from "./Nav.module.css"
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2><span>CV-generator</span></h2>
      <div className={styles.left}>

        <p className={styles.heading}>
          A <span>Resume</span> that stands out!
        </p>
      </div>

      <div className=''>
        <Link to="/" className={styles.button} >Home</Link>
        <Link to="/admin" className={styles.button} onClick={() => navigate('/admin')}>Admin Tool</Link>
      </div>
    </div>
  )
}

export default Nav