const express = require('express');
const db = require('./database');
const app = express();

app.use(express.json());

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidCreditCard = (cardNumber) => /^\d{12}$/.test(cardNumber);

const isValidCVV = (cvv) => /^\d{3}$/.test(cvv);

app.post('/register', (req, res) => {
    const { name, address, email, date_of_birth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp } = req.body;

    if (!name || !address || !email || !date_of_birth || !gender || !age || !cardHolderName || !cardNumber || !expiryDate || !cvv || !timeStamp) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    if (!isValidCreditCard(cardNumber)) {
        return res.status(400).json({ error: "Invalid credit card number. It must be 12 digits." });
    }

    if (!isValidCVV(cvv)) {
        return res.status(400).json({ error: "Invalid CVV. It must be 3 digits." });
    }

    const query = `
        INSERT INTO customer (name, address, email, date_of_birth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [name, address, email, date_of_birth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp], function (err) {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT") {
                return res.status(400).json({ error: "Email already exists" });
            }
            return res.status(500).json({ error: "Database error" });
        }
        
        res.status(201).json({
            message: `customer ${name} has registered`,
            customerId: this.lastID
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
