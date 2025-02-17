import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usercss/Book.css';
import { BsPersonFill } from 'react-icons/bs';
import { IoIosNotifications } from "react-icons/io";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { VscOpenPreview } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import logo from './assets/logo.jpg';
import logo1 from './assets/gym1.jpg';

function Book({ onBookingAdded }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [resources, setResources] = useState("");
  const [remarks, setRemarks] = useState("");
  const [venueOptions, setVenueOptions] = useState([]);
  const [resourceOptions, setResourceOptions] = useState([]);
  const [existingBookings, setExistingBookings] = useState([]);
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
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the selected date and time overlap with existing bookings
    const isOverlapping = existingBookings.some(booking => {
      const bookingStart = new Date(booking.start_time);
      const bookingEnd = new Date(booking.end_time);
      const selectedStart = new Date(startTime);
      const selectedEnd = new Date(endTime);

      return (
        (selectedStart >= bookingStart && selectedStart < bookingEnd) ||
        (selectedEnd > bookingStart && selectedEnd <= bookingEnd) ||
        (selectedStart <= bookingStart && selectedEnd >= bookingEnd)
      );
    });

    if (isOverlapping) {
      alert("The selected date and time overlap with an existing booking. Please choose a different time.");
      return;
    }

    const data = {
      eventTitle,
      venue,
      startTime,
      endTime,
      resources,
      remarks,
    };

    try {
      const response = await fetch("http://localhost/elphp/add_booking.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.message) {
        alert(result.message);
        // Clear the form
        setEventTitle("");
        setVenue("");
        setStartTime("");
        setEndTime("");
        setResources("");
        setRemarks("");
        // Notify the parent component to refresh the calendar events
        if (onBookingAdded) {
          onBookingAdded();
        }
      } else if (result.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error adding booking:", error);
      alert("An error occurred while adding the booking.");
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await fetch("http://localhost/elphp/get_venues.php");
      const result = await response.json();
      setVenueOptions(result);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await fetch("http://localhost/elphp/get_resources.php");
      const result = await response.json();
      setResourceOptions(result);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const fetchExistingBookings = async () => {
    try {
      const response = await fetch("http://localhost/elphp/get_bookings1.php");
      const result = await response.json();
      setExistingBookings(result);
    } catch (error) {
      console.error("Error fetching existing bookings:", error);
    }
  };

  useEffect(() => {
    fetchVenues();
    fetchResources();
    fetchExistingBookings();
  }, []);

  const today = new Date().toISOString().slice(0, 16);

  return (
    <div className='Book-container'>
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
      <div className='Bookright-container'>
        <div className='UserTopBar'>
          <div className="Left-content">
            <p>BOOK A VENUE</p>
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

        <div className="content-container">
          <form onSubmit={handleSubmit}>
            <div className="text-box-container">
              <label htmlFor="eventTitle" className="text-label">Title of the Event</label>
              <input
                id="eventTitle"
                type="text"
                placeholder="Required"
                className="text-box"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />

              <label htmlFor="venue" className="text-label">Venue</label>
              <select
                id="venue"
                className="dropdown-box"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              >
                <option value="" disabled>Select a venue</option>
                {venueOptions.map((venue) => (
                  <option key={venue.id} value={venue.venue_name}>{venue.venue_name}</option>
                ))}
              </select>

              <label htmlFor="startTime" className="text-label">Date & Time</label>
              <input
                id="startTime"
                type="datetime-local"
                placeholder="Required"
                className="text-box"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                min={today}
              />

              <label htmlFor="endTime" className="text-label">Event Ended</label>
              <input
                id="endTime"
                type="datetime-local"
                placeholder="Required"
                className="text-box"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                min={startTime}
              />

              <label htmlFor="resources" className="text-label">Resources</label>
              <select
                id="resources"
                className="dropdown-box"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
              >
                <option value="" disabled>Select resources</option>
                {resourceOptions.map((resource) => (
                  <option key={resource.id} value={resource.bundle_name}>
                    {resource.bundle_name} - {resource.items.join(', ')}
                  </option>
                ))}
              </select>

              <div className='remarks-box'>
                <p>Remarks</p>
                <textarea
                  id="remarks"
                  type="textarea"
                  placeholder=""
                  className="remarks-description"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              <button className="submit-button" type="submit">Submit</button>
            </div>
          </form>

          <div className="right-container">
            <h2>GYMNASIUM</h2>
            <img
              src={logo1}
              alt="Top Full-Width"
              style={{ width: '420px', marginBottom: '20px', height: '280px', borderRadius: '20px' }}
            />
            <p>Description of the gymnasium...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;