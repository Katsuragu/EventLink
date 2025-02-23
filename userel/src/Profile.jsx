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
  const [firstName, setFirstName] = useState('Noli');
  const [lastName, setLastName] = useState('Example');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost/elphp/change_password.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          password: password
        })
      });

      const result = await response.json();
      if (result.error) {
        alert(result.error);
      } else {
        alert("Password changed successfully");
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
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

            <div className="input-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => handleChange(e, setFirstName)}
                className="input-field"
              />
            </div>
           
            <div className="input-group">
              <label>New Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => handleChange(e, setPassword)}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => handleChange(e, setConfirmPassword)}
                className="input-field"
              />
            </div>

            {/* Edit Profile Button */}
            <button className="save-button" onClick={handlePasswordChange}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;