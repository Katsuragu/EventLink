import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Book from "./Book";
import Preview from "./Preview";
import Reservation from "./Reservation";
import About from "./About"; 
import Venue1 from "./Venue1";
import Venue2 from "./Venue2";
import Venue3 from "./Venue3";
import Venue4 from "./Venue4";
import Profile from "./Profile";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminReservation from "./AdminReservation";
import AdminIncidentReport from "./pages/AdminIncidentReport";
import AddResources from "./pages/AddResources";
import AddVenue from "./pages/AddVenue";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/UserDashboard' element={<UserDashboard/>} />
        <Route path='/AdminDashboard' element={<AdminDashboard/>} />
        <Route path='/AdminReservation' element={<AdminReservation/>} />
        <Route path='/AdminIncidentReport' element={<AdminIncidentReport/>} />
        <Route path='/AddResources' element={<AddResources/>} />
        <Route path='/AddVenue' element={<AddVenue/>} />
        <Route path='/Book' element={<Book/>} />
        <Route path='/Preview' element={<Preview/>} />
        <Route path='/Reservation' element={<Reservation/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Venue1' element={<Venue1/>} />
        <Route path='/Venue2' element={<Venue2/>} />
        <Route path='/Venue3' element={<Venue3/>} />
        <Route path='/Venue4' element={<Venue4/>} />
        <Route path='/Profile' element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;