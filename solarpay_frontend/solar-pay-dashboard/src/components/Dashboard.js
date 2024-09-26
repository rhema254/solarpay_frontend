import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUser from './AddUser';  // Ensure correct import for AddUser component

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleUserAdded = () => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
        setShowAddUserForm(false);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="card">
          <h3>Total Payments</h3>
          <p>300</p>
        </div>
        <div className="card">
          <h3>Pending Payments</h3>
          <p>50</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>$5000</p>
        </div>
      </div>

      <button onClick={() => setShowAddUserForm(true)} className="add-user-btn">
        Add New User
      </button>

      {showAddUserForm && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowAddUserForm(false)}>Close</button>
            <AddUser onUserAdded={handleUserAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;  // Ensure the component is exported correctly
