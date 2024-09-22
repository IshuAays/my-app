// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import UserLogin from './pages/UserLogin';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NavBar from './Components/NavBar';
import ParticleBackground from './Components/ParticleBackground1';
import MyChatBot from './Components/MyChatBot';
import CVLatexEditor from './pages/CVLatexEditor';
import PowerBIReport from './pages/PowerBIReport';
import ATSApp from './pages/ATSApp';
import JdCreator from './pages/JdCreator';
import Info from './pages/Info';
import Analyst from './pages/Analyst'
import Engineer from './pages/Engineer'
import Science from './pages/Science'
import PrivateRoute from './Components/PrivateRoute';
import HrStuff from './pages/HrStuff';
import { Toaster } from 'react-hot-toast';
import Bandwidth from './pages/Bandwidth';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App text-white">
        <header className="App-header">
          <NavBar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/powerbi-report" element={<PowerBIReport />} />
            <Route path="/userlogin" element={isLoggedIn ? <Navigate to="/dashboard" /> : <UserLogin setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<Dashboard />} />} />
            <Route path="/powerbi-dashboard" element={<PowerBIReport />} />
            <Route path="/resume-builder" element={<CVLatexEditor />} /> 
            <Route path="/ats" element={<ATSApp />} />
            <Route path="/jd-create" element={<JdCreator />} /> 
            <Route path="/info" element={<Info />} />
            <Route path="/data-analytics" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<Analyst />} />} />
            <Route path="/data-engineering" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<Engineer />} />} />
            <Route path="/data-science" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<Science />} />} />
            <Route path="/HR-stuff" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<HrStuff />} />} />
            <Route path="/band-width" element={<PrivateRoute isAuthenticated={isLoggedIn} element={<Bandwidth />} />} />

          </Routes>
        </header>
        <MyChatBot />
        <ParticleBackground />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;
