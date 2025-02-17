import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Login.css';
import { IoMdArrowRoundBack } from "react-icons/io";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e, setState) => {
        setState(e.target.value);
    };

    const handleSignup = async () => {
        if (!email.endsWith('@gmail.com')) {
            setMessage('Email must be a valid @gmail.com address');
            return;
        }

        try {
            const response = await fetch('http://localhost/signup.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password }),
            });
            const data = await response.json();
            setMessage(data.message || data.error);
        } catch (error) {
            setMessage('An error occurred while signing up.');
        }
    };

    return (
        <div className="Login-Container">
            <div className="Login-Left-Side">
                <div className="Left-Side-Content1">
                    <p>WELCOME</p>
                </div>
                <div className="Left-Side-Content2">
                    <p>TO</p>
                </div>
                <div className="Left-Side-Content3">
                    <p>EVENTLINK</p>
                </div>
            </div>

            <div className="Login-Right-Side">
                <div className="Login-Text">
                    <p>SIGN UP</p>
                </div>
                
                <div className="Login-Content" style={{ marginTop: '100px' }}>
                    <div className="Back-Icon">
                        <Link to="/"><IoMdArrowRoundBack style={{ fontSize: '33px', marginRight: '5px', color: 'black' }} /></Link>
                    </div>
                    <div className="Email-Input">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => handleChange(e, setEmail)}
                            className="Login-Field1"
                        />
                    </div>
                    <div className="Login-Input1">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => handleChange(e, setUsername)}
                            className="Login-Field1"
                        />
                    </div>
                    <div className="Password-Input">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => handleChange(e, setPassword)}
                            className="Login-Field1"
                        />
                    </div>
                    <button className="save-button" onClick={handleSignup}>Sign Up</button>
                    {message && <p className="Message" style={{fontSize:"20px"}}>{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Signup;