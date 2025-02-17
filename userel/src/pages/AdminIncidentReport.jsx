import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/incidentReport.css';
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";

export default function AdminIncidentReport() {
    const [studentName, setStudentName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [incidentType, setIncidentType] = useState("");
    const [otherIncident, setOtherIncident] = useState("");
    const [description, setDescription] = useState("");
    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/');
        }
    }, [navigate]);

    const handleOtherChange = (e) => {
        setOtherIncident(e.target.value);
    };

    const handleOtherCheckboxChange = (e) => {
        setIsOtherChecked(e.target.checked);
        if (!e.target.checked) {
            setOtherIncident("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            studentName,
            contactNumber,
            incidentType: isOtherChecked ? "Other" : incidentType,
            otherIncident: isOtherChecked ? otherIncident : "",
            description,
        };

        try {
            const response = await fetch("http://localhost/elphp/add_incident_report.php", {
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
                setStudentName("");
                setContactNumber("");
                setIncidentType("");
                setOtherIncident("");
                setDescription("");
                setIsOtherChecked(false);
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error adding incident report:", error);
            alert("An error occurred while adding the incident report.");
        }
    };

    return (
        <div className="admin-dashboard-container">
            <AdminSidebar item1="Dashboard" item2="Reservation" item3="Add Venue" item4="Add Resources" item5="Incident Report" />
            <div className="admin-dashboard-right">
                <AdminHeader header="Incident Report" name="Admin Name" />
                <div className="admin-right-content">
                    <div className="container incident-container">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">Name of Student/s Involved</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{ width: '50%', height: '30px' }}
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="form-label">Contact Number</label>
                                <input
                                    type="contactNumber"
                                    className="form-control"
                                    style={{ width: '30%', height: '30px' }}
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                />
                            </div>

                            <div className="row">
                                <div className="container incident-type-container">
                                    <label className="type-of-incident">Type of Incident</label>
                                    <div className="incident-options">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="incidentType"
                                                value="Accident"
                                                checked={incidentType === "Accident"}
                                                onChange={(e) => setIncidentType(e.target.value)}
                                            /> Accident
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="incidentType"
                                                value="Injury"
                                                checked={incidentType === "Injury"}
                                                onChange={(e) => setIncidentType(e.target.value)}
                                            /> Injury
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="incidentType"
                                                value="Misbehavior"
                                                checked={incidentType === "Misbehavior"}
                                                onChange={(e) => setIncidentType(e.target.value)}
                                            /> Misbehavior
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="incidentType"
                                                value="Other"
                                                checked={isOtherChecked}
                                                onChange={handleOtherCheckboxChange}
                                            /> Other (Please Specify)
                                            {isOtherChecked && (
                                                <textarea
                                                    style={{ width: '100%', height: '200px' }}
                                                    value={otherIncident}
                                                    onChange={handleOtherChange}
                                                />
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className="container-describe-incident">
                                    <label className="incident-describe">Describe Incident</label>
                                    <textarea
                                        style={{ width: '500px', height: '300px', resize: 'none' }}
                                        className="input-describe"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="incident-submit">
                                <button className="incident-btn" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}