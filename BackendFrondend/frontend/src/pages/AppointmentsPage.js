// src/pages/AppointmentsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [form, setForm] = useState({
    Pet_ID: '', Vet_ID: '', Appointment_Date: '', Appointment_Time: '', Reason: '', Payment_Amount: '', Payment_Due: '', Payment_Method: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:8081/appointments').then(res => setAppointments(res.data));
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
    const url = editingId ? `http://localhost:8081/appointments/${editingId}` : 'http://localhost:8081/appointments';
    axios[method](url, form).then(() => {
      setForm({ Pet_ID: '', Vet_ID: '', Appointment_Date: '', Appointment_Time: '', Reason: '', Payment_Amount: '', Payment_Due: '', Payment_Method: '' });
      setEditingId(null);
      fetchData();
    });
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:8081/appointments/${id}`).then(() => fetchData());
  };

  const handleEdit = item => {
    setForm({
      Pet_ID: item.Pet_ID,
      Vet_ID: item.Vet_ID,
      Appointment_Date: item.Appointment_Date?.split('T')[0],
      Appointment_Time: item.Appointment_Time,
      Reason: item.Reason,
      Payment_Amount: item.Payment_Amount,
      Payment_Due: item.Payment_Due?.split('T')[0],
      Payment_Method: item.Payment_Method
    });
    setEditingId(item.Appointment_ID);
  };

  return (
    <div>
      <h2>Appointments</h2>
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
        <input type="date" name="Appointment_Date" value={form.Appointment_Date} onChange={handleChange} required />
        <input type="time" name="Appointment_Time" value={form.Appointment_Time} onChange={handleChange} required />
        <input name="Reason" value={form.Reason} onChange={handleChange} placeholder="Reason" />
        <input name="Payment_Amount" value={form.Payment_Amount} onChange={handleChange} placeholder="Amount" />
        <input type="date" name="Payment_Due" value={form.Payment_Due} onChange={handleChange} />
        <input name="Payment_Method" value={form.Payment_Method} onChange={handleChange} placeholder="Payment Method" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Appointment</button>
      </form>

      <ul>
        {appointments.map(a => (
          <li key={a.Appointment_ID}>
            {a.Appointment_Date} {a.Appointment_Time} - {a.PetName} with {a.VetName} - {a.Reason}
            <button onClick={() => handleEdit(a)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(a.Appointment_ID)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentsPage;