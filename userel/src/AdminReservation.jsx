import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './css/Reservation.css';
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminReservation() {
    const [bookings, setBookings] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [processedBookings, setProcessedBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/');
        }
    }, [navigate]);

    const fetchBookings = async () => {
        try {
            const response = await fetch("http://localhost/elphp/get_bookings.php");
            const result = await response.json();
            setBookings(result);
            setPendingBookings(result.filter(booking => booking.status === 'pending'));
            setProcessedBookings(result.filter(booking => booking.status !== 'pending'));
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const updateBookingStatus = async (id, status) => {
        try {
            const response = await fetch("http://localhost/elphp/update_booking_status.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, status }),
            });

            const result = await response.json();
            if (result.message) {
                alert(result.message);
                fetchBookings(); // Refresh the bookings list
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
            alert("An error occurred while updating the booking status.");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="admin-dashboard-container">
            <AdminSidebar item1="Dashboard" item2="Reservation" item3="Add Venue" item4="Add Resources" item5="Incident Report" />
            <div className="admin-dashboard-right">
                <AdminHeader header="Admin Reservation" name="Admin Name" />
                <div className="admin-right-content">
                    <h1 className="title-pending">Pending Reservation</h1>

                    <div className="admin-reservation-header">
                        <div className="reservation-left-section">
                            <span>Show</span>
                            <select>
                                <option value="option1">1</option>
                                <option value="option2">2</option>
                                <option value="option3">3</option>
                            </select>
                            <span>entries</span>
                        </div>

                        <form className="reservation-search-form">
                            <input
                                className="reservation-search-input"
                                type="search"
                                placeholder="Search"
                            />
                        </form>
                    </div>

                    <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '20px', border: '2px solid black'}}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>ID</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Title of the Event</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Venue</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Event Start</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Event End</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Resources</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Remarks</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Date Created</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Status</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pendingBookings.map((row, index) => (
                                <tr key={index} style={{borderBottom: '1px solid black'}}>
                                    <td style={{ padding: '8px' }}>{row.id}</td>
                                    <td style={{ padding: '8px' }}>{row.event_title}</td>
                                    <td style={{padding: '8px' }}>{row.venue}</td>
                                    <td style={{padding: '8px' }}>{row.start_time}</td>
                                    <td style={{padding: '8px' }}>{row.end_time}</td>
                                    <td style={{padding: '8px' }}>{row.resources}</td>
                                    <td style={{padding: '8px' }}>{row.remarks}</td>
                                    <td style={{padding: '8px' }}>{row.date_created}</td>
                                    <td style={{padding: '8px' }}>{row.status}</td>
                                    <td style={{padding: '8px' }}>
                                        <div className="btn-action">
                                            <button className="btn-approve" onClick={() => updateBookingStatus(row.id, 'accepted')}>Approve</button>
                                            <button className="btn-decline" onClick={() => updateBookingStatus(row.id, 'declined')}>Decline</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="pagination-container">
                        <span className="entries-info">Showing 1 to {pendingBookings.length} of {pendingBookings.length} entries</span>
                        <div className="page-counter">
                            <button className="page-btn">Previous</button>
                            <span className="current-page">1</span>
                            <span className="total-page"> of 1</span>
                            <button className="page-btn">Next</button>
                        </div>
                    </div>

                    <h1 className="title-processed">Accepted and Declined Reservations</h1>

                    <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '20px', border: '2px solid black'}}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>ID</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Title of the Event</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Venue</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Event Start</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Event End</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Resources</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Remarks</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Date Created</th>
                                <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {processedBookings.map((row, index) => (
                                <tr key={index} style={{borderBottom: '1px solid black'}}>
                                    <td style={{ padding: '8px' }}>{row.id}</td>
                                    <td style={{ padding: '8px' }}>{row.event_title}</td>
                                    <td style={{padding: '8px' }}>{row.venue}</td>
                                    <td style={{padding: '8px' }}>{row.start_time}</td>
                                    <td style={{padding: '8px' }}>{row.end_time}</td>
                                    <td style={{padding: '8px' }}>{row.resources}</td>
                                    <td style={{padding: '8px' }}>{row.remarks}</td>
                                    <td style={{padding: '8px' }}>{row.date_created}</td>
                                    <td style={{padding: '8px' }}>{row.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="pagination-container">
                        <span className="entries-info">Showing 1 to {processedBookings.length} of {processedBookings.length} entries</span>
                        <div className="page-counter">
                            <button className="page-btn">Previous</button>
                            <span className="current-page">1</span>
                            <span className="total-page"> of 1</span>
                            <button className="page-btn">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}