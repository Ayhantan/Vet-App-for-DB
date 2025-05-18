-- OWNER TABLE
CREATE TABLE Owner (
    Owner_ID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Phone_Number VARCHAR(20),
    Address VARCHAR(255)
);

-- VETERINARIAN TABLE
CREATE TABLE Veterinarian (
    Vet_ID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Phone_Number VARCHAR(20),
    Specialization VARCHAR(100)
);

-- PET TABLE
CREATE TABLE Pet (
    Pet_ID INT PRIMARY KEY IDENTITY(1,1),
    Owner_ID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Breed VARCHAR(100),
    Species VARCHAR(100),
    Gender VARCHAR(10),
    Date_of_Birth DATE,
    Medical_History TEXT,
    FOREIGN KEY (Owner_ID) REFERENCES Owner(Owner_ID)
);

-- APPOINTMENT TABLE
CREATE TABLE Appointment (
    Appointment_ID INT PRIMARY KEY IDENTITY(1,1),
    Pet_ID INT NOT NULL,
    Vet_ID INT NOT NULL,
    Appointment_Date DATE NOT NULL,
    Appointment_Time TIME NOT NULL,
    Reason TEXT,
    Payment_Amount DECIMAL(10,2),
    Payment_Due DATE,
    Payment_Method VARCHAR(50),
    FOREIGN KEY (Pet_ID) REFERENCES Pet(Pet_ID),
    FOREIGN KEY (Vet_ID) REFERENCES Veterinarian(Vet_ID)
);

-- MEDICAL RECORD TABLE
CREATE TABLE Medical_Record (
    Record_ID INT PRIMARY KEY IDENTITY(1,1),
    Pet_ID INT NOT NULL,
    Vet_ID INT NOT NULL,
    Diagnosis TEXT,
    Treatment TEXT,
    Date DATE NOT NULL,
    Notes TEXT,
    FOREIGN KEY (Pet_ID) REFERENCES Pet(Pet_ID),
    FOREIGN KEY (Vet_ID) REFERENCES Veterinarian(Vet_ID)
);

-- PRESCRIPTION TABLE
CREATE TABLE Prescription (
    Prescription_ID INT PRIMARY KEY IDENTITY(1,1),
    Record_ID INT NOT NULL,
    Dosage VARCHAR(100),
    Duration VARCHAR(100),
    FOREIGN KEY (Record_ID) REFERENCES Medical_Record(Record_ID)
);

INSERT INTO Owner (Name, Email, Phone_Number, Address) VALUES 
('Ayse Yilmaz', 'ayse@gmail.com', '05001234567', 'Cankaya, Ankara'),
('Mehmet Demir', 'mehmetd@hotmail.com', '05007654321', 'Kadikoy, Istanbul'),
('Elif Koc', 'elifkoc@gmail.com', '05301239876', 'Bornova, Izmir'),
('Ali Can', 'alican@outlook.com', '05401239874', 'Muratpasa, Antalya'),
('Zeynep Arslan', 'zeynep.arslan@gmail.com', '05507894561', 'Nilufer, Bursa'),
('Murat Celik', 'muratcelik@gmail.com', '05007896432', 'Tepebasi, Eskisehir'),
('Fatma Gunes', 'fatmagunes@gmail.com', '05203458976', 'Seyhan, Adana'),
('Hasan Ucar', 'hasan.ucar@yahoo.com', '05304561234', 'Selcuklu, Konya'),
('Selin Aydin', 'selin.aydin@gmail.com', '05406781234', 'Atakum, Samsun'),
('Kerem Sahin', 'kerem.sahin@hotmail.com', '05004561239', 'Sahinbey, Gaziantep');


INSERT INTO Veterinarian (Name, Phone_Number, Specialization) VALUES
('Dr. Cem Yildiz', '05501234567', 'Cat Diseases'),
('Dr. Aylin Kaya', '05407894561', 'Dog Behavior'),
('Dr. Berk Can', '05004561233', 'Emergency Care'),
('Dr. Ece Duran', '05304561289', 'Vaccination Tracking'),
('Dr. Emre Soylu', '05207894567', 'Surgery'),
('Dr. Derya Karaca', '05001239876', 'Bird Health'),
('Dr. Onur Ates', '05104567890', 'Exotic Animals'),
('Dr. Burcu Sen', '05403214567', 'Internal Medicine'),
('Dr. Tolga Erdem', '05306543210', 'Skin Diseases'),
('Dr. Yasemin Isik', '05502345678', 'Ophthalmology');


INSERT INTO Pet (Owner_ID, Name, Breed, Species, Gender, Date_of_Birth, Medical_History) VALUES
(1, 'Snowball', 'Persian', 'Cat', 'Female', '2020-01-10', 'Has seasonal allergies'),
(2, 'Max', 'Labrador', 'Dog', 'Male', '2019-06-21', 'Completed vaccinations'),
(3, 'Mia', 'Beagle', 'Dog', 'Female', '2018-11-05', 'Skin sensitivities'),
(4, 'Leo', 'British Shorthair', 'Cat', 'Male', '2021-02-15', 'Neutered'),
(5, 'Luna', 'Golden Retriever', 'Dog', 'Female', '2020-09-30', 'Mild hair shedding'),
(6, 'Kiki', 'Cockatiel', 'Bird', 'Female', '2022-03-12', 'Beak overgrowth'),
(7, 'Oscar', 'Iguana', 'Reptile', 'Male', '2017-07-18', 'Routine checks only'),
(8, 'Bella', 'Rabbit', 'Mammal', 'Female', '2021-04-25', 'Annual exam due'),
(9, 'Chloe', 'Parrot', 'Bird', 'Female', '2019-12-09', 'Feather dullness'),
(10, 'Simba', 'Siamese', 'Cat', 'Male', '2022-08-01', 'Eye redness noted');


INSERT INTO Appointment (Pet_ID, Vet_ID, Appointment_Date, Appointment_Time, Reason, Payment_Amount, Payment_Due, Payment_Method) VALUES
(1, 1, '2025-05-01', '10:30:00', 'Allergy check', 300.00, '2025-05-10', 'Cash'),
(2, 2, '2025-05-02', '11:00:00', 'Vaccination update', 250.00, '2025-05-10', 'Credit Card'),
(3, 3, '2025-05-03', '12:00:00', 'Skin rash', 200.00, '2025-05-11', 'Bank Transfer'),
(4, 4, '2025-05-04', '09:00:00', 'Spaying check', 500.00, '2025-05-15', 'Cash'),
(5, 5, '2025-05-05', '14:00:00', 'Hair shedding', 150.00, '2025-05-16', 'Credit Card'),
(6, 6, '2025-05-06', '13:30:00', 'Beak trimming', 120.00, '2025-05-12', 'Cash'),
(7, 7, '2025-05-07', '15:00:00', 'Routine check', 100.00, '2025-05-13', 'Credit Card'),
(8, 8, '2025-05-08', '11:30:00', 'Annual exam', 300.00, '2025-05-18', 'Bank Transfer'),
(9, 9, '2025-05-09', '10:00:00', 'Hair control', 180.00, '2025-05-17', 'Cash'),
(10, 10, '2025-05-10', '16:00:00', 'Eye examination', 220.00, '2025-05-20', 'Credit Card');

INSERT INTO Medical_Record (Pet_ID, Vet_ID, Diagnosis, Treatment, Date, Notes) VALUES
(1, 1, 'Allergic reaction', 'Antihistamine treatment', '2025-05-01', 'Snowball was itchy'),
(2, 2, 'Vaccine update', 'Mixed vaccine given', '2025-05-02', 'No fever'),
(3, 3, 'Skin infection', 'Antibiotic ointment', '2025-05-03', 'Has itchy spots'),
(4, 4, 'Post-op check', 'Stitches removed', '2025-05-04', 'Healing well'),
(5, 5, 'Hair loss', 'Biotin supplement', '2025-05-05', 'Possible vitamin deficiency'),
(6, 6, 'Overgrown beak', 'Beak trimmed', '2025-05-06', 'Looks normal'),
(7, 7, 'Routine exam', 'All normal', '2025-05-07', 'Only signs of aging'),
(8, 8, 'Annual check-up', 'Full blood test', '2025-05-08', 'Awaiting results'),
(9, 9, 'Dull feathers', 'Omega-3 supplement', '2025-05-09', 'Follow-up in 1 week'),
(10, 10, 'Red eye', 'Eye drops prescribed', '2025-05-10', 'To be applied twice daily');

INSERT INTO Prescription (Record_ID, Dosage, Duration) VALUES
(1, '5 mg', '7 days'),
(2, '2 doses', '1 day'),
(3, '3 times/day', '10 days'),
(4, '1 tablet', '5 days'),
(5, '1 capsule', '15 days'),
(6, 'Vitamin drops', '10 days'),
(7, 'Multivitamin', '30 days'),
(8, 'Nutritional supplement', '14 days'),
(9, 'Omega 3', '20 days'),
(10, 'Eye drops', '5 days');
