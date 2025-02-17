import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Resources.css';
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";

export default function AddResources() {
    const [bundleName, setBundleName] = useState("");
    const [chairs, setChairs] = useState(0);
    const [tables, setTables] = useState(0);
    const [microphones, setMicrophones] = useState(0);
    const [soundSystem, setSoundSystem] = useState(0);
    const [projectors, setProjectors] = useState(0);
    const [bundles, setBundles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/');
        }
    }, [navigate]);

    const handleAddBundle = async () => {
        const data = {
            bundleName,
            chairs,
            tables,
            microphones,
            soundSystem,
            projectors,
        };

        try {
            const response = await fetch("http://localhost/elphp/add_resources.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.message) {
                alert(result.message);
                fetchBundles(); // Refresh the bundles list
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error adding bundle:", error);
            alert("An error occurred while adding the bundle.");
        }
    };

    const handleDeleteBundle = async (bundleId) => {
        try {
            const response = await fetch("http://localhost/elphp/delete_resources.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bundleId }),
            });

            const result = await response.json();
            if (result.message) {
                alert(result.message);
                fetchBundles(); // Refresh the bundles list
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error deleting bundle:", error);
            alert("An error occurred while deleting the bundle.");
        }
    };

    const fetchBundles = async () => {
        try {
            const response = await fetch("http://localhost/elphp/get_resources.php");
            const result = await response.json();
            setBundles(result);
        } catch (error) {
            console.error("Error fetching bundles:", error);
        }
    };

    useEffect(() => {
        fetchBundles();
    }, []);

    const handleCounterChange = (setter, value) => {
        setter(value >= 0 ? value : 0);
    };

    return (
        <div className="admin-dashboard-container">
            <AdminSidebar item1="Dashboard" item2="Reservation" item3="Add Venue" item4="Add Resources" item5="Incident Report" />
            <div className="admin-dashboard-right">
                <AdminHeader header="Add Resources" name="Admin Name" />
                <div className="admin-right-content">
                    <div className="container rsc-container">
                        <div>
                            <label className="form-label">Bundle Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                style={{ width: '30%', height: '30px' }}
                                value={bundleName}
                                onChange={(e) => setBundleName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="form-label">Chair/s: </label>
                            <input
                                type="number"
                                className="form-control"
                                style={{ width: '10%', height: '30px' }}
                                value={chairs}
                                onChange={(e) => handleCounterChange(setChairs, parseInt(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="form-label">Table/s: </label>
                            <input
                                type="number"
                                style={{ width: '10%', height: '30px' }}
                                className="form-control"
                                value={tables}
                                onChange={(e) => handleCounterChange(setTables, parseInt(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="form-label">Microphone/s: </label>
                            <input
                                type="number"
                                style={{ width: '10%', height: '30px' }}
                                className="form-control"
                                value={microphones}
                                onChange={(e) => handleCounterChange(setMicrophones, parseInt(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="form-label">Sound System: </label>
                            <input
                                type="number"
                                style={{ width: '10%', height: '30px' }}
                                className="form-control"
                                value={soundSystem}
                                onChange={(e) => handleCounterChange(setSoundSystem, parseInt(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="form-label">Projector/s: </label>
                            <input
                                type="number"
                                style={{ width: '10%', height: '30px' }}
                                className="form-control"
                                value={projectors}
                                onChange={(e) => handleCounterChange(setProjectors, parseInt(e.target.value))}
                            />
                        </div>

                        <div className="btn-add">
                            <button className="btn-add-bundle" onClick={handleAddBundle}>
                                Add Bundle
                            </button>
                        </div>
                    </div>

                    <div className="container bundle-list">
                        <h2>Resource Bundles</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px' }}>ID</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Bundle Name</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Chairs</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Tables</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Microphones</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Sound System</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Projectors</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bundles.map((bundle) => (
                                    <tr key={bundle.id} style={{ borderBottom: '1px solid black' }}>
                                        <td style={{ padding: '8px' }}>{bundle.id}</td>
                                        <td style={{ padding: '8px' }}>{bundle.bundle_name}</td>
                                        <td style={{ padding: '8px' }}>{bundle.chairs}</td>
                                        <td style={{ padding: '8px' }}>{bundle.tables}</td>
                                        <td style={{ padding: '8px' }}>{bundle.microphones}</td>
                                        <td style={{ padding: '8px' }}>{bundle.sound_systems}</td>
                                        <td style={{ padding: '8px' }}>{bundle.projectors}</td>
                                        <td style={{ padding: '8px', display: "flex", justifyContent: "space-around" }}>
                                            <button onClick={() => handleDeleteBundle(bundle.id)} style={{ backgroundColor: "red", padding: "10px 20px", color: "white", border: "none", borderRadius: "20px" }}>Delete</button>
                                        </td>
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