// src/pages/PrescriptionsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ Record_ID: '', Dosage: '', Duration: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:8081/prescriptions').then(res => setPrescriptions(res.data));
    axios.get('http://localhost:8081/records').then(res => setRecords(res.data));
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
    const url = editingId ? `http://localhost:8081/prescriptions/${editingId}` : 'http://localhost:8081/prescriptions';
    axios[method](url, form).then(() => {
      setForm({ Record_ID: '', Dosage: '', Duration: '' });
      setEditingId(null);
      fetchData();
    });
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:8081/prescriptions/${id}`).then(() => fetchData());
  };

  const handleEdit = item => {
    setForm({
      Record_ID: item.Record_ID,
      Dosage: item.Dosage,
      Duration: item.Duration
    });
    setEditingId(item.Prescription_ID);
  };

  return (
    <div>
      <h2>Prescriptions</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <select name="Record_ID" value={form.Record_ID} onChange={handleChange} required>
          <option value="">Select Medical Record</option>
          {records.map(r => (
            <option key={r.Record_ID} value={r.Record_ID}>{r.PetName} - {r.Diagnosis}</option>
          ))}
        </select>
        <input name="Dosage" value={form.Dosage} onChange={handleChange} placeholder="Dosage" required />
        <input name="Duration" value={form.Duration} onChange={handleChange} placeholder="Duration" required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Prescription</button>
      </form>

      <ul>
        {prescriptions.map(p => (
          <li key={p.Prescription_ID}>
            {p.PetName} - {p.Dosage} for {p.Duration}
            <button onClick={() => handleEdit(p)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(p.Prescription_ID)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrescriptionsPage;