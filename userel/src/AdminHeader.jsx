import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserDropdown from "./pages/UserDropdown";
import { useNavigate } from 'react-router-dom';

export default function AdminHeader(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleUserIconClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    const handleLogout = () => {
        // Clear session data
        localStorage.removeItem('username');
        localStorage.removeItem('access');
        navigate('/');
    };

    return (
        <div className="admin-right-header">
            <div className="admin-header-left">
                <h1>{props.header}</h1>
            </div>
            <div className="admin-header-right">
                <label htmlFor="">{props.name}</label>
                <FontAwesomeIcon icon={faBell} style={{ marginLeft: '10px', color: 'white' }} />
                <FontAwesomeIcon icon={faUser} style={{ marginLeft: '10px', cursor: 'pointer', color: 'white' }} onClick={handleUserIconClick} />
                <UserDropdown show={showDropdown} handleClose={handleCloseDropdown} handleLogout={handleLogout} />
            </div>
        </div>
    );
}