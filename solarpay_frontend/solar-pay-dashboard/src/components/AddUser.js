import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';

const AddUser = ({ onUserAdded }) => {
  const [user, setUser] = useState({
    phone_number: '',
    f_name: '',
    l_name: '',
    county: '',
    town: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setError('');   // Clear previous errors

    try {
      const response = await axios.post('http://localhost:5000/api/users', user);
      setMessage(response.data.message);
      setUser({ phone_number: '', f_name: '', l_name: '', county: '', town: '' }); // Reset user state
      onUserAdded(); // Notify parent component of new user
    } catch (error) {
      console.error('There was an error adding the user!', error);
      setError('Error adding user: ' + (error.response?.data?.error || error.message)); // Show error message from the server
    }
  };

  return (
    <div className="add-user">
      <h2>Add New User</h2>
      {message && <p className="success-message">{message}</p>} {/* Success message */}
      {error && <p className="error-message">{error}</p>} {/* Error message */}
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={user.phone_number}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="f_name"
            value={user.f_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="l_name"
            value={user.l_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          County:
          <input
            type="text"
            name="county"
            value={user.county}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Town:
          <input
            type="text"
            name="town"
            value={user.town}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
