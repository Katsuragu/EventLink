import React from "react";
import { Link } from 'react-router-dom';

export default function UserDropdown({ show, handleClose, handleLogout }) {
    if (!show) {
        return null;
    }

    return (
        <div className="dropdown-menu">
            <Link to="/Profile" className="dropdown-item" onClick={handleClose}>Profile</Link>
            <button onClick={handleLogout} className="dropdown-item">Logout</button>
        </div>
    );
}