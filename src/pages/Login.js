import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import styles from '../components/navbar/Nav.module.css';
import { validateEmail } from '../util/Validate';
import { COMMON_ERROR, EMAIL_ERROR, ENDDATE_ERROR } from '../util/Constants';
import InputControl from '../components/inputs/InputControl';
import Nav from '../components/navbar/Nav';
import { useResume } from '../context/ResumeProvider';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailerror, setEmailError] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useResume()
    const handleLogin = () => {
        console.log("email ", email)
        if (email && password) {
            if (!validateEmail(email)) {
                setEmailError(EMAIL_ERROR)
                return
            }
            localStorage.setItem('isLoggedIn', JSON.stringify({ "value": "true", "email": email }));
            setIsLoggedIn(true)

            navigate('/admin');
        } else {
            setError(COMMON_ERROR);
        }
    };

    return (
        <div className={styles.main}>
            <Nav />
            <div className={styles.loginContainer}>

                <h2>Login</h2>

                <InputControl
                    label="Email"
                    type="email"
                    placeholder="Enter the email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}

                    errormsg={emailerror}
                />

                <InputControl
                    label="Password"
                    type="password"
                    placeholder="Enter the password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />


                <button className={styles.login} onClick={handleLogin}>Login</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>

    );
}

export default Login;
