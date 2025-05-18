// src/pages/OwnersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './All.css';

function OwnersPage() {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({ Name: '', Email: '', Phone_Number: '', Address: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchOwners = () => {
    axios.get('http://localhost:8081/owners')
      .then(res => setOwners(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:8081/owners/${editingId}`, form)
        .then(() => {
          setForm({ Name: '', Email: '', Phone_Number: '', Address: '' });
          setEditingId(null);
          fetchOwners();
        });
    } else {
      axios.post('http://localhost:8081/owners', form)
        .then(() => {
          setForm({ Name: '', Email: '', Phone_Number: '', Address: '' });
          fetchOwners();
        });
    }
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:8081/owners/${id}`)
      .then(() => fetchOwners());
  };

  const handleEdit = owner => {
    setForm({
      Name: owner.Name,
      Email: owner.Email,
      Phone_Number: owner.Phone_Number,
      Address: owner.Address
    });
    setEditingId(owner.Owner_ID);
  };

  return (
    <div>
      <h2>Owners</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="Name" value={form.Name} onChange={handleChange} placeholder="Name" required />
        <input name="Email" value={form.Email} onChange={handleChange} placeholder="Email" />
        <input name="Phone_Number" value={form.Phone_Number} onChange={handleChange} placeholder="Phone Number" />
        <input name="Address" value={form.Address} onChange={handleChange} placeholder="Address" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Owner</button>
      </form>

      <ul>
        {owners.map(owner => (
          <li key={owner.Owner_ID}>
            <span>
            {owner.Name} - {owner.Email} - {owner.Phone_Number} - {owner.Address}
            </span>
            <div>
            <button onClick={() => handleEdit(owner)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(owner.Owner_ID)} style={{ marginLeft: '5px' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnersPage;
