import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import { BsPersonFill } from 'react-icons/bs'; // Import the Person Icon
import { IoIosNotifications } from "react-icons/io";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { VscOpenPreview } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import logo from './assets/logo.jpg';

function Profile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
    }
  }, [navigate]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('username');
    localStorage.removeItem('access');
    navigate('/');
  };

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/auth.php/change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUsername, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Optionally, redirect the user to another page
        navigate('/UserDashboard');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Unable to connect to the server. Please try again.');
    }
  };

  return (
    <div className='Main-Profile-container'>
      <div className='UserSideBar'>
        <div className='EventLink-Logo'>
          <img src={logo} alt="" />
        </div>
        <div className='Sidebar-content'>
          <div className='Top-content'>
            <Link to="/UserDashboard"><TbBrandWindowsFilled style={{ fontSize: '25px', marginRight: '5px' }} />Dashboard</Link>
            <Link to="/Book"><HiOutlinePencilAlt style={{ fontSize: '25px', marginRight: '5px' }} />Book A Venue</Link>
            <Link to="/Preview"><VscOpenPreview style={{ fontSize: '25px', marginRight: '5px' }} />Preview Venue</Link>
            <Link to="/Reservation"><FaRegCalendar style={{ fontSize: '25px', marginRight: '5px' }} />Reservation</Link>
          </div>
          <div className="Bot-content">
            <Link to="/About"><RxQuestionMarkCircled style={{ fontSize: '25px', marginRight: '5px' }} />About EventLink</Link>
          </div>
        </div>
      </div>
      <div className='Profileright-container'>
        <div className='UserTopBar'>
          <div className="Left-content">
            <p>EDIT YOUR PROFILE</p>
          </div>
          <div className="Right-content">
            <p>Hi, {localStorage.getItem('username')}</p>
            <Link to="/"><IoIosNotifications style={{ fontSize: '33px', marginRight: '5px', color: 'white' }} /></Link>
            <div className="profile-dropdown" onClick={toggleDropdown}>
              <BsPersonFill style={{ fontSize: '33px', marginRight: '5px', color: 'white' }} />
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/Profile" className="dropdown-item">Profile</Link>
                  <Link to="/">
                    <button onClick={handleLogout} className="dropdown-item">Logout</button></Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="Profile-content">
          <div className='Profile-text'>
            <p>PROFILE</p>
          </div>

          <div className="profile-container">
            <div className='Profile-Picture'>
              <img
                src="https://via.placeholder.com/600x400"
                alt="Grid Image 1"
                style={{ width: '150px', height: '150px', borderRadius: '80px' }}
              />
            </div>

            {/* Profile Information (Input fields) */}
            <div className='Profile-name'>
              <h2>{localStorage.getItem('username')}'s Profile</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>New Username:</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => handleChange(e, setNewUsername)}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => handleChange(e, setNewPassword)}
                  className="input-field"
                />
              </div>

              {/* Edit Profile Button */}
              <button type="submit" className="save-button">Update</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;