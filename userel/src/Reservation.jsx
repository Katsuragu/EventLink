import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Usercss/Reservation.css';
import { BsPersonFill } from 'react-icons/bs'; // Import the Person Icon
import { IoIosNotifications } from "react-icons/io";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { VscOpenPreview } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import logo from './assets/logo.jpg';

function Reservation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [bookings, setBookings] = useState([]);
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

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost/elphp/get_bookings.php");
      const result = await response.json();
      setBookings(result);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className='Reservation-content'>
      {/* Top Navbar */}
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
      <div className="Reservationright-container">
        <div className='UserTopBar'>
          <div className="Left-content">
            <p>RESERVATION</p>
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

        <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '20px', border: '2px solid black' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>ID</th>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Title of the Event</th>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Venue</th>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Event Start</th>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Event End</th>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Resources</th>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Remarks</th>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Date Created</th>
              <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid black' }}>
                <td style={{ padding: '8px' }}>{row.id}</td>
                <td style={{ padding: '8px' }}>{row.event_title}</td>
                <td style={{ padding: '8px' }}>{row.venue}</td>
                <td style={{ padding: '8px' }}>{row.start_time}</td>
                <td style={{ padding: '8px' }}>{row.end_time}</td>
                <td style={{ padding: '8px' }}>{row.resources}</td>
                <td style={{ padding: '8px' }}>{row.remarks}</td>
                <td style={{ padding: '8px' }}>{row.date_created}</td>
                <td style={{ padding: '8px' }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <span className="entries-info">Showing 1 to {bookings.length} of {bookings.length} entries</span>
          <div className="page-counter">
            <button className="page-btn">Previous</button>
            <span className="current-page">1</span>
            <span className="total-page"> of 1</span>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation;