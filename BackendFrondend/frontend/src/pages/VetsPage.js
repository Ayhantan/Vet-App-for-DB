// src/pages/VetsPage.js
//<div style={{ display: 'flex', justifyContent: 'center' }}></div>
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VetsPage() {
  const [vets, setVets] = useState([]);
  const [form, setForm] = useState({ Name: '', Phone_Number: '', Specialization: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchVets = () => {
    axios.get('http://localhost:8081/vets')
      .then(res => setVets(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchVets();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:8081/vets/${editingId}`, form)
        .then(() => {
          setForm({ Name: '', Phone_Number: '', Specialization: '' });
          setEditingId(null);
          fetchVets();
        });
    } else {
      axios.post('http://localhost:8081/vets', form)
        .then(() => {
          setForm({ Name: '', Phone_Number: '', Specialization: '' });
          fetchVets();
        });
    }
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:8081/vets/${id}`)
      .then(() => fetchVets());
  };

  const handleEdit = vet => {
    setForm({
      Name: vet.Name,
      Phone_Number: vet.Phone_Number,
      Specialization: vet.Specialization
    });
    setEditingId(vet.Vet_ID);
  };

  return (
    <div>
      <h2>Veterinarians 👨🏽‍⚕️</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="Name" value={form.Name} onChange={handleChange} placeholder="Name" required />
        <input name="Phone_Number" value={form.Phone_Number} onChange={handleChange} placeholder="Phone Number" />
        <input name="Specialization" value={form.Specialization} onChange={handleChange} placeholder="Specialization" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Vet</button>
      </form>
      

      <ul>
        {vets.map(vet => (
          <li key={vet.Vet_ID}>
            <span>
            {vet.Name} - {vet.Phone_Number} - {vet.Specialization}
            </span>
            <div>
            <button onClick={() => handleEdit(vet)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(vet.Vet_ID)} style={{ marginLeft: '5px' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VetsPage;