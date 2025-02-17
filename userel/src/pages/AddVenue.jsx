import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/AddVenue.css';
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";

export default function AddVenue() {
    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [venueData, setVenueData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/');
        }
    }, [navigate]);

    const handleAddVenue = async (e) => {
        e.preventDefault();

        const data = {
            venueName,
            description,
        };

        try {
            const response = await fetch("http://localhost/elphp/add_venue.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.message) {
                alert(result.message);
                fetchVenues(); // Fetch the updated list of venues
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error adding venue:", error);
            alert("An error occurred while adding the venue.");
        }
    };

    const fetchVenues = async () => {
        try {
            const response = await fetch("http://localhost/elphp/get_venues.php");
            const result = await response.json();
            setVenueData(result);
        } catch (error) {
            console.error("Error fetching venues:", error);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    return (
        <div className="admin-dashboard-container">
            <AdminSidebar item1="Dashboard" item2="Reservation" item3="Add Venue" item4="Add Resources" item5="Incident Report" />
            <div className="admin-dashboard-right">
                <AdminHeader header="Add Venue" name="Admin Name" />
                <div className="admin-right-content">
                    <div className="container first-container">
                        <form onSubmit={handleAddVenue}>
                            <div className="form-group">
                                <label htmlFor="venueName" className="col-form-label">Venue Name: </label>
                                <input
                                    style={{ width: '100%', padding: '12px 20px', margin: '8px 0', display: 'inline-block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'}}
                                    type="text"
                                    className="form-control"
                                    id="venueName"
                                    value={venueName}
                                    onChange={(e) => setVenueName(e.target.value)}
                                />
                            </div>

                            <div className="form-floating">
                                <label htmlFor="Description" className="col-form-label">Description: </label>
                                <textarea
                                    className="form-control"
                                    style={{ height: 100, width: '100%', padding: '12px 20px', margin: '8px 0', display: 'inline-block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'}}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="btn-submit">
                                <button className="submit-btn" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className="container second-container">
                        <h1>Added Venues</h1>

                        <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '20px', border: '2px solid black'}}>
                            <thead>
                                <tr>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px'}}>ID</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Venue Name</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px'}}>Description</th>
                                </tr>
                            </thead>

                            <tbody>
                                {venueData.map((row, index) => (
                                    <tr key={index} style={{borderBottom: '1px solid black'}}>
                                        <td style={{ padding: '8px' }}>{row.id}</td>
                                        <td style={{ padding: '8px' }}>{row.venue_name}</td>
                                        <td style={{padding: '8px' }}>{row.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}