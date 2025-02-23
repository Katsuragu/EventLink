import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usercss/UserDashboard.css';
import { BsPersonFill } from 'react-icons/bs';
import { IoIosNotifications } from "react-icons/io";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { VscOpenPreview } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Bar } from 'react-chartjs-2';
import Calendar from './components/Calendar';
import Calendar1 from './components/Calendar1';
import Book from './Book';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import logo from './assets/logo.jpg';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function UserDashboard() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [events, setEvents] = useState([]);
  const [venueBookingData, setVenueBookingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/');
    }
  }, [navigate]);

  const handleCalendarClick = () => {
    setShowCalendar(true);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('username');
    localStorage.removeItem('access');
    navigate('/');
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost/elphp/get_events.php");
      const result = await response.json();
      setEvents(result);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchVenueBookingData = async () => {
    try {
      const response = await fetch("http://localhost/elphp/get_venue_booking_data.php");
      const result = await response.json();
      setVenueBookingData(result);
    } catch (error) {
      console.error("Error fetching venue booking data:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchVenueBookingData();
  }, []);

  const data = {
    labels: venueBookingData.map(item => item.venue),
    datasets: [
      {
        label: 'Bookings',
        data: venueBookingData.map(item => item.count),
        backgroundColor: '#343f82',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Most Booked Venues',
      },
    },
  };

  return (
    <div className='dashboard-container'>
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
      <div className='Dashboard-boxes-content'>
        <div className='UserTopBar'>
          <div className="Left-content">
            <p>DASHBOARD</p>
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
              
        <div className='lower-boxes-content' style={{ marginTop: '130px' }}>
          <div className='lower-boxes'>
            <div className='box4'>
              <div className='chart-wrapper'>
                <Bar data={data} options={options} />
              </div>
            </div>
            <div className='box5' onClick={handleCalendarClick} style={{ backgroundColor: '#343f82', cursor: 'pointer' }}>
              <div className='calendar-box'>
                <Calendar1 events={events} />
              </div>
            </div>
            {showCalendar && (
              <div className="calendar-modal">
                <div className="modal-content">
                  <button className="close-button" onClick={closeCalendar}>
                    &times;
                  </button>
                  <Calendar events={events} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;