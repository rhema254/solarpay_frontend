import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/payments">Payments</Link></li>
        <li><Link to="/complaints">Complaints</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
