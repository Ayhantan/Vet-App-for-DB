// src/pages/PetsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function PetsPage() {
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({
    Owner_ID: '', Name: '', Breed: '', Species: '', Gender: '', Date_of_Birth: '', Medical_History: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('pet');

  const fetchPets = () => {
    axios.get('http://localhost:8081/pets')
      .then(res => setPets(res.data))
      .catch(err => console.error(err));
  };

  const fetchOwners = () => {
    axios.get('http://localhost:8081/owners')
      .then(res => setOwners(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPets();
    fetchOwners();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:8081/pets/${editingId}`, form)
        .then(() => {
          setForm({ Owner_ID: '', Name: '', Breed: '', Species: '', Gender: '', Date_of_Birth: '', Medical_History: '' });
          setEditingId(null);
          fetchPets();
        });
    } else {
      axios.post('http://localhost:8081/pets', form)
        .then(() => {
          setForm({ Owner_ID: '', Name: '', Breed: '', Species: '', Gender: '', Date_of_Birth: '', Medical_History: '' });
          fetchPets();
        });
    }
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:8081/pets/${id}`)
      .then(() => fetchPets());
  };

  const handleEdit = pet => {
    setForm({
      Owner_ID: pet.Owner_ID,
      Name: pet.Name,
      Breed: pet.Breed,
      Species: pet.Species,
      Gender: pet.Gender,
      Date_of_Birth: pet.Date_of_Birth?.split('T')[0],
      Medical_History: pet.Medical_History
    });
    setEditingId(pet.Pet_ID);
  };

  const filteredPets = pets.filter(pet => {
    if (searchBy === 'pet') {
      return pet.Name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return pet.OwnerName.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div>
      <h2>🦏 🦜 Pets 🐶 🐺 </h2>

      <div className="search-bar">
        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
          <option value="pet">Search by Pet</option>
          <option value="owner">Search by Owner</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchBy === 'pet' ? 'pet name' : 'owner name'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <select name="Owner_ID" value={form.Owner_ID} onChange={handleChange} required>
          <option value="">Select Owner</option>
          {owners.map(o => (
            <option key={o.Owner_ID} value={o.Owner_ID}>{o.Name}</option>
          ))}
        </select>
        <input name="Name" value={form.Name} onChange={handleChange} placeholder="Name" required />
        <input name="Breed" value={form.Breed} onChange={handleChange} placeholder="Breed" />
        <input name="Species" value={form.Species} onChange={handleChange} placeholder="Species" />
        <input name="Gender" value={form.Gender} onChange={handleChange} placeholder="Gender" />
        <input name="Date_of_Birth" type="date" value={form.Date_of_Birth} onChange={handleChange} />
        <input name="Medical_History" value={form.Medical_History} onChange={handleChange} placeholder="Medical History" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Pet</button>
      </form>


      <ul>
        {filteredPets.map(pet => (
          <li key={pet.Pet_ID}>
            <span>
              {pet.Name} ({pet.Species}) - Owner: {pet.OwnerName}</span>
            <div>
              <button onClick={() => handleEdit(pet)} style={{ marginLeft: '10px' }}>Edit</button>
              <button onClick={() => handleDelete(pet.Pet_ID)} style={{ marginLeft: '5px' }}>Delete</button></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetsPage;