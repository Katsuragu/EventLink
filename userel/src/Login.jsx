import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const access = localStorage.getItem('access');

        if (storedUsername && access) {
            if (access === '1') {
                navigate('/UserDashboard');
            } else if (access === '2') {
                navigate('/AdminDashboard');
            }
        }
    }, [navigate]);

    const handleChange = (e, setState) => {
        setState(e.target.value);
    };

    const handleLogout = () => {
        // Clear session data
        localStorage.removeItem('username');
        localStorage.removeItem('access');
        navigate('/');
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost/auth.php/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.redirect) {
                // Store session data in local storage
                localStorage.setItem('username', username);
                localStorage.setItem('access', data.access);

                if (data.access === 1) {
                    navigate('/UserDashboard');
                } else if (data.access === 2) {
                    navigate('/AdminDashboard');
                }
            } else {
                console.error(data.error || 'An error occurred.');
                setMessage(data.error || 'An error occurred.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Unable to connect to the server. Please try again.');
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
                    <p>LOG IN</p>
                </div>

                <div className="Login-Content" style={{ marginTop: '100px' }}>
                    <div className="Login-Input">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => handleChange(e, setUsername)}
                            className="Login-Field"
                        />
                    </div>
                    <div className="Password-Input">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => handleChange(e, setPassword)}
                            className="Login-Field"
                        />
                    </div>
                    <div className="Signup-Link">
                        <p>
                            <Link to="/Signup">Don't have an account?</Link>
                        </p>
                    </div>
                    <button className="save-button" onClick={handleLogin}>Log In</button>
                    {message && <p className="Message" style={{fontSize: "20px"}}>{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;