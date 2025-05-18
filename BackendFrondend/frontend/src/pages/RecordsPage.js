// src/pages/RecordsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [form, setForm] = useState({
    Pet_ID: '', Vet_ID: '', Diagnosis: '', Treatment: '', Date: '', Notes: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:8081/records').then(res => setRecords(res.data));
    axios.get('http://localhost:8081/pets').then(res => setPets(res.data));
    axios.get('http://localhost:8081/vets').then(res => setVets(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = editingId ? 'put' : 'post';
    const url = editingId ? `http://localhost:8081/records/${editingId}` : 'http://localhost:8081/records';
    axios[method](url, form).then(() => {
      setForm({ Pet_ID: '', Vet_ID: '', Diagnosis: '', Treatment: '', Date: '', Notes: '' });
      setEditingId(null);
      fetchData();
    });
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:8081/records/${id}`).then(() => fetchData());
  };

  const handleEdit = record => {
    setForm({
      Pet_ID: record.Pet_ID,
      Vet_ID: record.Vet_ID,
      Diagnosis: record.Diagnosis,
      Treatment: record.Treatment,
      Date: record.Date?.split('T')[0],
      Notes: record.Notes
    });
    setEditingId(record.Record_ID);
  };

  return (
    <div>
      <h2>Medical Records</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <select name="Pet_ID" value={form.Pet_ID} onChange={handleChange} required>
          <option value="">Select Pet</option>
          {pets.map(pet => (
            <option key={pet.Pet_ID} value={pet.Pet_ID}>{pet.Name}</option>
          ))}
        </select>
        <select name="Vet_ID" value={form.Vet_ID} onChange={handleChange} required>
          <option value="">Select Vet</option>
          {vets.map(vet => (
            <option key={vet.Vet_ID} value={vet.Vet_ID}>{vet.Name}</option>
          ))}
        </select>
        <input name="Diagnosis" value={form.Diagnosis} onChange={handleChange} placeholder="Diagnosis" required />
        <input name="Treatment" value={form.Treatment} onChange={handleChange} placeholder="Treatment" />
        <input type="date" name="Date" value={form.Date} onChange={handleChange} required />
        <input name="Notes" value={form.Notes} onChange={handleChange} placeholder="Notes" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Record</button>
      </form>

      <ul>
        {records.map(r => (
          <li key={r.Record_ID}>
            {r.Date} - {r.PetName} - {r.Diagnosis} by {r.VetName}
            <button onClick={() => handleEdit(r)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(r.Record_ID)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordsPage;