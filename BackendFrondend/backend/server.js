// server.js
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MS SQL Server connection configuration
const config = {
    user: 'sa',
    password: '123',
    server: 'localhost', // or use your instance if different
    database: 'vet',
    options: {
        trustServerCertificate: true,
        encrypt: false,
        port: 1433 // default TCP port for SQL Server
    }
};

let pool;

// Connect to the SQL Server
sql.connect(config).then(p => {
    pool = p;
    console.log("Connected to MSSQL Database");

    // Start server after DB connection
    app.listen(8081, () => {
        console.log("Server is running on port 8081");
    });

}).catch(err => {
    console.error("Database connection error:", err);
});

// Routes
app.get('/', (req, res) => {
    res.send("Vet Clinic Backend is running!");
});

//OWNERS
app.get('/owners', async (req, res) => {
    try {
        const result = await pool.request().query('SELECT * FROM Owner');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/owners', async (req, res) => {
    const { Name, Email, Phone_Number, Address } = req.body;
    try {
        await pool.request()
            .input('Name', sql.VarChar, Name)
            .input('Email', sql.VarChar, Email)
            .input('Phone_Number', sql.VarChar, Phone_Number)
            .input('Address', sql.VarChar, Address)
            .query('INSERT INTO Owner (Name, Email, Phone_Number, Address) VALUES (@Name, @Email, @Phone_Number, @Address)');
        res.status(201).json({ message: 'Owner added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/owners/:id', async (req, res) => {
    const { Name, Email, Phone_Number, Address } = req.body;
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('Name', sql.VarChar, Name)
            .input('Email', sql.VarChar, Email)
            .input('Phone_Number', sql.VarChar, Phone_Number)
            .input('Address', sql.VarChar, Address)
            .query('UPDATE Owner SET Name=@Name, Email=@Email, Phone_Number=@Phone_Number, Address=@Address WHERE Owner_ID=@id');
        res.status(200).json({ message: 'Owner updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/owners/:id', async (req, res) => {
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Owner WHERE Owner_ID = @id');
        res.status(200).json({ message: 'Owner deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//VETS
app.get('/vets', async (req, res) => {
    try {
        const result = await pool.request().query('SELECT * FROM Veterinarian');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/vets', async (req, res) => {
    const { Name, Phone_Number, Specialization } = req.body;
    try {
        await pool.request()
            .input('Name', sql.VarChar, Name)
            .input('Phone_Number', sql.VarChar, Phone_Number)
            .input('Specialization', sql.VarChar, Specialization)
            .query('INSERT INTO Veterinarian (Name, Phone_Number, Specialization) VALUES (@Name, @Phone_Number, @Specialization)');
        res.status(201).json({ message: 'Vet added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/vets/:id', async (req, res) => {
    const { Name, Phone_Number, Specialization } = req.body;
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('Name', sql.VarChar, Name)
            .input('Phone_Number', sql.VarChar, Phone_Number)
            .input('Specialization', sql.VarChar, Specialization)
            .query('UPDATE Veterinarian SET Name=@Name, Phone_Number=@Phone_Number, Specialization=@Specialization WHERE Vet_ID=@id');
        res.status(200).json({ message: 'Vet updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/vets/:id', async (req, res) => {
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Veterinarian WHERE Vet_ID = @id');
        res.status(200).json({ message: 'Vet deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//PETS
app.get('/pets', async (req, res) => {
    const query = `
        SELECT Pet.*, Owner.Name AS OwnerName
        FROM Pet
        JOIN Owner ON Pet.Owner_ID = Owner.Owner_ID`;
    try {
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/pets', async (req, res) => {
    const { Owner_ID, Name, Breed, Species, Gender, Date_of_Birth, Medical_History } = req.body;
    try {
        await pool.request()
            .input('Owner_ID', sql.Int, Owner_ID)
            .input('Name', sql.VarChar, Name)
            .input('Breed', sql.VarChar, Breed)
            .input('Species', sql.VarChar, Species)
            .input('Gender', sql.VarChar, Gender)
            .input('Date_of_Birth', sql.Date, Date_of_Birth)
            .input('Medical_History', sql.Text, Medical_History)
            .query(`
                INSERT INTO Pet (Owner_ID, Name, Breed, Species, Gender, Date_of_Birth, Medical_History)
                VALUES (@Owner_ID, @Name, @Breed, @Species, @Gender, @Date_of_Birth, @Medical_History)
            `);
        res.status(201).json({ message: 'Pet added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/pets/:id', async (req, res) => {
    const { Owner_ID, Name, Breed, Species, Gender, Date_of_Birth, Medical_History } = req.body;
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('Owner_ID', sql.Int, Owner_ID)
            .input('Name', sql.VarChar, Name)
            .input('Breed', sql.VarChar, Breed)
            .input('Species', sql.VarChar, Species)
            .input('Gender', sql.VarChar, Gender)
            .input('Date_of_Birth', sql.Date, Date_of_Birth)
            .input('Medical_History', sql.Text, Medical_History)
            .query(`
                UPDATE Pet
                SET Owner_ID = @Owner_ID, Name = @Name, Breed = @Breed, Species = @Species,
                    Gender = @Gender, Date_of_Birth = @Date_of_Birth, Medical_History = @Medical_History
                WHERE Pet_ID = @id
            `);
        res.status(200).json({ message: 'Pet updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/pets/:id', async (req, res) => {
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Pet WHERE Pet_ID = @id');
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Appoitntments
app.get('/appointments', async (req, res) => {
    const query = `
        SELECT Appointment.*, Pet.Name AS PetName, Veterinarian.Name AS VetName
        FROM Appointment
        JOIN Pet ON Appointment.Pet_ID = Pet.Pet_ID
        JOIN Veterinarian ON Appointment.Vet_ID = Veterinarian.Vet_ID`;
    try {
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/appointments', async (req, res) => {
    const {
        Pet_ID, Vet_ID, Appointment_Date, Appointment_Time,
        Reason, Payment_Amount, Payment_Due, Payment_Method
    } = req.body;

    try {
        await pool.request()
            .input('Pet_ID', sql.Int, Pet_ID)
            .input('Vet_ID', sql.Int, Vet_ID)
            .input('Appointment_Date', sql.Date, Appointment_Date)
            .input('Appointment_Time', sql.Time, Appointment_Time)
            .input('Reason', sql.Text, Reason)
            .input('Payment_Amount', sql.Decimal(10, 2), Payment_Amount)
            .input('Payment_Due', sql.Date, Payment_Due)
            .input('Payment_Method', sql.VarChar, Payment_Method)
            .query(`
                INSERT INTO Appointment 
                (Pet_ID, Vet_ID, Appointment_Date, Appointment_Time, Reason, Payment_Amount, Payment_Due, Payment_Method)
                VALUES 
                (@Pet_ID, @Vet_ID, @Appointment_Date, @Appointment_Time, @Reason, @Payment_Amount, @Payment_Due, @Payment_Method)
            `);

        res.status(201).json({ message: 'Appointment created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/appointments/:id', async (req, res) => {
    const {
        Pet_ID, Vet_ID, Appointment_Date, Appointment_Time,
        Reason, Payment_Amount, Payment_Due, Payment_Method
    } = req.body;

    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('Pet_ID', sql.Int, Pet_ID)
            .input('Vet_ID', sql.Int, Vet_ID)
            .input('Appointment_Date', sql.Date, Appointment_Date)
            .input('Appointment_Time', sql.Time, Appointment_Time)
            .input('Reason', sql.Text, Reason)
            .input('Payment_Amount', sql.Decimal(10, 2), Payment_Amount)
            .input('Payment_Due', sql.Date, Payment_Due)
            .input('Payment_Method', sql.VarChar, Payment_Method)
            .query(`
                UPDATE Appointment SET
                Pet_ID = @Pet_ID,
                Vet_ID = @Vet_ID,
                Appointment_Date = @Appointment_Date,
                Appointment_Time = @Appointment_Time,
                Reason = @Reason,
                Payment_Amount = @Payment_Amount,
                Payment_Due = @Payment_Due,
                Payment_Method = @Payment_Method
                WHERE Appointment_ID = @id
            `);

        res.status(200).json({ message: 'Appointment updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/appointments/:id', async (req, res) => {
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Appointment WHERE Appointment_ID = @id');
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//Records
app.get('/records', async (req, res) => {
    const query = `
        SELECT Medical_Record.*, Pet.Name AS PetName, Veterinarian.Name AS VetName
        FROM Medical_Record
        JOIN Pet ON Medical_Record.Pet_ID = Pet.Pet_ID
        JOIN Veterinarian ON Medical_Record.Vet_ID = Veterinarian.Vet_ID`;
    try {
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/records', async (req, res) => {
    const { Pet_ID, Vet_ID, Diagnosis, Treatment, Date, Notes } = req.body;

    try {
        await pool.request()
            .input('Pet_ID', sql.Int, Pet_ID)
            .input('Vet_ID', sql.Int, Vet_ID)
            .input('Diagnosis', sql.Text, Diagnosis)
            .input('Treatment', sql.Text, Treatment)
            .input('Date', sql.Date, Date)
            .input('Notes', sql.Text, Notes)
            .query(`
                INSERT INTO Medical_Record 
                (Pet_ID, Vet_ID, Diagnosis, Treatment, Date, Notes)
                VALUES 
                (@Pet_ID, @Vet_ID, @Diagnosis, @Treatment, @Date, @Notes)
            `);

        res.status(201).json({ message: 'Record created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/records/:id', async (req, res) => {
    const { Pet_ID, Vet_ID, Diagnosis, Treatment, Date, Notes } = req.body;

    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('Pet_ID', sql.Int, Pet_ID)
            .input('Vet_ID', sql.Int, Vet_ID)
            .input('Diagnosis', sql.Text, Diagnosis)
            .input('Treatment', sql.Text, Treatment)
            .input('Date', sql.Date, Date)
            .input('Notes', sql.Text, Notes)
            .query(`
                UPDATE Medical_Record SET
                    Pet_ID = @Pet_ID,
                    Vet_ID = @Vet_ID,
                    Diagnosis = @Diagnosis,
                    Treatment = @Treatment,
                    Date = @Date,
                    Notes = @Notes
                WHERE Record_ID = @id
            `);

        res.status(200).json({ message: 'Record updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/records/:id', async (req, res) => {
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Medical_Record WHERE Record_ID = @id');
        res.status(200).json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






//Prescriptions
app.get('/prescriptions', async (req, res) => {
    const query = `
        SELECT Prescription.*, Medical_Record.Diagnosis, Pet.Name AS PetName
        FROM Prescription
        JOIN Medical_Record ON Prescription.Record_ID = Medical_Record.Record_ID
        JOIN Pet ON Medical_Record.Pet_ID = Pet.Pet_ID`;
    try {
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/prescriptions', async (req, res) => {
    const { Record_ID, Dosage, Duration } = req.body;

    try {
        await pool.request()
            .input('Record_ID', sql.Int, Record_ID)
            .input('Dosage', sql.VarChar, Dosage)
            .input('Duration', sql.VarChar, Duration)
            .query(`
                INSERT INTO Prescription (Record_ID, Dosage, Duration)
                VALUES (@Record_ID, @Dosage, @Duration)
            `);

        res.status(201).json({ message: 'Prescription created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/prescriptions/:id', async (req, res) => {
    const { Record_ID, Dosage, Duration } = req.body;

    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('Record_ID', sql.Int, Record_ID)
            .input('Dosage', sql.VarChar, Dosage)
            .input('Duration', sql.VarChar, Duration)
            .query(`
                UPDATE Prescription SET
                    Record_ID = @Record_ID,
                    Dosage = @Dosage,
                    Duration = @Duration
                WHERE Prescription_ID = @id
            `);

        res.status(200).json({ message: 'Prescription updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/prescriptions/:id', async (req, res) => {
    try {
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Prescription WHERE Prescription_ID = @id');

        res.status(200).json({ message: 'Prescription deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Login 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM Users WHERE Username = @username AND Password = @password');

        if (result.recordset.length === 1) {
            const user = result.recordset[0];
            res.json({ message: 'Login successful', user: { username: user.Username, role: user.Role } });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

