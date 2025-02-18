import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './css/Admin.css';
import Calendar from "./components/Calendar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminDashboard() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [counts, setCounts] = useState({ pending_count: 0, accepted_count: 0, declined_count: 0 });
    const [events, setEvents] = useState([]);
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

    const fetchCounts = async () => {
        try {
            const response = await fetch("http://localhost/elphp/get_booking_counts.php");
            const result = await response.json();
            setCounts(result);
        } catch (error) {
            console.error("Error fetching booking counts:", error);
        }
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

    useEffect(() => {
        fetchCounts();
        fetchEvents();
    }, []);

    return (
        <div className="admin-dashboard-container">
            <AdminSidebar item1="Dashboard" item2="Reservation" item3="Add Venue" item4="Add Resources" item5="Incident Report" />
            <div className="admin-dashboard-right">
                <AdminHeader header="Admin Dashboard" name="Admin Name" />
                <div className="admin-right-content">
                    <div className="admin-content-header">
                        <div className="admin-content-approve">
                            <h1>{counts.pending_count}</h1>
                            <label htmlFor="">To Approve</label>
                        </div>

                        <div className="admin-content-total">
                            <h1>{counts.accepted_count}</h1>
                            <label htmlFor="">Accepted Booking</label>
                        </div>

                        <div className="admin-content-declined">
                            <h1>{counts.declined_count}</h1>
                            <label htmlFor="">Declined Booking</label>
                        </div>
                    </div>

                    <div className="admin-content-footer">
                        <div className="admin-footer-calendar" onClick={handleCalendarClick}>
                            <label htmlFor="" style={{ cursor: "pointer" }}>Calendar</label>
                            
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
    );
}