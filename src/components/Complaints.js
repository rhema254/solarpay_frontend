import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error("There was an error fetching the complaints!", error);
        setError("Failed to fetch complaints. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = async (complaintId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/complaints/${complaintId}`, { status: "closed" });
      console.log(response.data.message);

      // Update local state to reflect the change
      setComplaints(complaints.map(complaint =>
        complaint.id === complaintId ? { ...complaint, status: "closed" } : complaint
      ));
      setSuccessMessage(`Complaint ID ${complaintId} closed successfully!`); // Set success message
    } catch (error) {
      console.error("There was an error updating the complaint status!", error);
      setError("Failed to update complaint status. Please try again.");
    }
  };

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="complaints">
      <h1>Complaints</h1>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Category</th>
              <th>Status</th>
              <th>Submission Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(complaint => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.user_id}</td>
                <td>{complaint.category}</td>
                <td>{complaint.status}</td>
                <td>{complaint.submission_date}</td>
                <td>
                  {complaint.status === "open" && (
                    <button onClick={() => handleStatusChange(complaint.id)}>Close</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Complaints;
