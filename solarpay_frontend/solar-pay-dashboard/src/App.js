import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Payments from './components/Payments';
import Complaints from './components/Complaints';
import Sidebar from './components/Sidebar';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/complaints" element={<Complaints />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
