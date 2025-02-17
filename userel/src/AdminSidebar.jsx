import React from "react";
import { Link } from "react-router-dom";
import logo from './assets/logo.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faPenToSquare, faCalendar, faFolder, faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

export default function AdminSidebar(props) {
    return(
        <div className="admin-dashboard-left">
            <div className="admin-dashboard-logo">
                <img src={logo} style={{ width: '200px', height: '150px'}} alt="Logo" />
            </div>

            <div className="admin-dashboard-content">   
                <div className="admin-dashboard-list">
                    <Link to="/AdminDashboard">
                        <div className="admin-dashboard-item">
                            <FontAwesomeIcon icon={faClipboard} style={{ marginRight: '10px' }}/>
                            <label htmlFor="">{props.item1}</label>
                        </div>
                    </Link>

                    <Link to="/AdminReservation">
                        <div className="admin-dashboard-item">
                            <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '10px' }}/>
                            <label htmlFor="">{props.item2}</label>
                        </div>
                    </Link>

                    <Link to="/AddVenue">
                        <div className="admin-dashboard-item">
                            <FontAwesomeIcon icon={faCalendar} style={{ marginRight: '10px' }}/>
                            <label htmlFor="">{props.item3}</label>
                        </div>
                    </Link>

                    <Link to="/AddResources">
                        <div className="admin-dashboard-item">
                            <FontAwesomeIcon icon={faFolder} style={{ marginRight: '10px' }}/>
                            <label htmlFor="">{props.item4}</label>
                        </div>
                    </Link>
                </div>

                <Link to="/AdminIncidentReport">
                    <div className="admin-dashboard-footer">
                        <div className="admin-dashboard-item">
                            <FontAwesomeIcon icon={faCircleQuestion} style={{ marginRight: '10px' }}/>
                            <label htmlFor="">{props.item5}</label>
                        </div>
                    </div>
                </Link>
            </div>  
        </div>
    );
}