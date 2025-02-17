import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usercss/Venue1.css';
import { BsPersonFill } from 'react-icons/bs'; // Import the Person Icon
import { IoIosNotifications } from "react-icons/io";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { VscOpenPreview } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import logo from './assets/logo.jpg';
import { IoMdArrowRoundBack } from "react-icons/io";
import logo1 from './assets/chapel1.jpg';
import logo2 from './assets/chapel2.jpg';

function Venue1() {
    const [showDropdown, setShowDropdown] = useState(false);
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

    return (
        <div className='Venue1-container'>
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

            <div className='Venue1-content'>
                <div className='UserTopBar'>
                    <div className="Left-content">
                        <p>VENUE</p>
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

                <div className="Venue-content-materials">
                    <div className="Venue-description">
                        <div className='Venue-text'>
                            <div className='Description-content'>
                                <div className='Back-Icon1'>
                                    <Link to="/Preview"><IoMdArrowRoundBack style={{ fontSize: '33px', marginRight: '5px', color: 'black' }} /></Link>
                                </div>
                                <h2>Chapel</h2>
                                <p>
                                    Welcome to Venue 1, an exceptional location designed for memorable events.
                                    Whether you're planning a wedding, corporate meeting, or a family gathering,
                                    our venue offers top-notch facilities and a stunning ambiance to suit any occasion.
                                    Welcome to Venue 1, an exceptional location designed for memorable events.
                                    Whether you're planning a wedding, corporate meeting, or a family gathering,
                                    our venue offers top-notch facilities and a stunning ambiance to suit any occasion.
                                    Welcome to Venue 1, an exceptional location designed for memorable events.
                                    Whether you're planning a wedding, corporate meeting, or a family gathering,
                                    our venue offers top-notch facilities and a stunning ambiance to suit any occasion.
                                    Welcome to Venue 1, an exceptional location designed for memorable events.
                                    Whether you're planning a wedding, corporate meeting, or a family gathering,
                                    our venue offers top-notch facilities and a stunning ambiance to suit any occasion.
                                    Welcome to Venue 1, an exceptional location designed for memorable events.
                                    Whether you're planning a wedding, corporate meeting, or a family gathering,
                                    our venue offers top-notch facilities and a stunning ambiance to suit any occasion.
                                </p>
                            </div>
                            <div className='Venue-Features'>
                                <p>
                                    Features include:
                                </p>
                                <ul>
                                    <li>Spacious seating for up to 200 guests</li>
                                    <li>Spacious seating for up to 200 guests</li>
                                </ul>
                            </div>
                        </div>
                        <div className='Venue-Button'>
                            <div className="Venue-book-button">
                                <Link to="/Book">
                                    <button>Book Venue</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="Venue-images">
                        <img src={logo1} alt="Venue Image 1" />
                        <img src={logo2} alt="Venue Image 2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Venue1;