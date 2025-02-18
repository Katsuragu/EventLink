import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usercss/Preview.css';
import { BsPersonFill } from 'react-icons/bs'; // Import the Person Icon
import { IoIosNotifications } from "react-icons/io";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { VscOpenPreview } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import logo from './assets/logo.jpg';
import logo1 from './assets/dasma.png';
import logo2 from './assets/chapel3.png';
import logo3 from './assets/gym3.png';
import logo4 from './assets/function3.png';
import logo5 from './assets/avr3.png';

function Preview() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/');
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

  return (
    <div className='Preview-container'>
      <div className='UserSideBar'>
        <div className='EventLink-Logo'>
          <img src={logo} alt="" />
        </div>
        <div className='Sidebar-content'>
          <div className='Top-content'>
            <Link to="/UserDashboard"><TbBrandWindowsFilled style={{ fontSize: '25px', marginRight: '5px' }} />Dashboard</Link>
            <Link to="/Book"><HiOutlinePencilAlt style={{ fontSize: '25px', marginRight: '5px' }} />Book A Venue</Link>
            <Link to="/Preview"><VscOpenPreview style={{ fontSize: '25px', marginRight: '5px' }} />Preview Venue</Link>
            <Link to="/Reservation"><FaRegCalendar style={{ fontSize: '25px', marginRight: '5px' }} />History</Link>
          </div>
          <div className="Bot-content">
            <Link to="/About"><RxQuestionMarkCircled style={{ fontSize: '25px', marginRight: '5px' }} />About EventLink</Link>
          </div>
        </div>
      </div>

      <div className="Previewright-container">
        <div className='UserTopBar'>
          <div className="Left-content">
            <p>PREVIEW VENUE</p>
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

        {/* Main Content */}
        <div className="Preview-images" >
          {/* Top Full-Width Image */}
          <img
            src={logo1}
            alt="Top Full-Width"
            style={{ width: '1600px', marginBottom: '20px', height: '280px', borderRadius: '20px' }}
          />

          {/* Image Grid */}
          <div className="image-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <Link to="/venue1">
              <img
                src={logo2}
                alt="Grid Image 1"
                style={{ width: '1200px', height: '210px', borderRadius: '20px' }}
              />
            </Link>
            <Link to="/venue2">
              <img
                src={logo3}
                alt="Grid Image 2"
                style={{ width: '1200px', height: '210px', borderRadius: '20px' }}
              />
            </Link>
            <Link to="/venue3">
              <img
                src={logo5}
                alt="Grid Image 3"
                style={{ width: '1200px', height: '210px', borderRadius: '20px' }}
              />
            </Link>
            <Link to="/venue4">
              <img
                src={logo4}
                alt="Grid Image 4"
                style={{ width: '1200px', height: '210px', borderRadius: '20px' }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;