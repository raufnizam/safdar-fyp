const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register
// In your auth routes file
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ 
                message: 'All fields are required',
                details: { username, email, password }
            });
        }

        // Check if user exists
        const [user] = await db.query(
            'SELECT * FROM users WHERE email = ? OR username = ?', 
            [email, username]
        ).catch(err => {
            console.error('Database query error:', err);
            throw new Error('Database error');
        });
        
        if (user.length > 0) {
            return res.status(409).json({ 
                message: 'User already exists',
                field: user[0].username === username ? 'username' : 'email'
            });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10).catch(err => {
            console.error('Salt generation error:', err);
            throw new Error('Password processing failed');
        });
        
        const hashedPassword = await bcrypt.hash(password, salt).catch(err => {
            console.error('Hashing error:', err);
            throw new Error('Password processing failed');
        });
        
        // Create user
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword]
        ).catch(err => {
            console.error('User creation error:', err);
            throw new Error('User creation failed');
        });
        
        res.status(201).json({ 
            message: 'User registered successfully',
            userId: result.insertId
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            message: err.message || 'Server error',
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// Login
// In your auth routes file
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt for username:', username); // Log incoming request
        
        if (!username || !password) {
            console.log('Validation failed - missing fields');
            return res.status(400).json({ 
                message: 'Username and password are required',
                field: !username ? 'username' : 'password'
            });
        }

        // Check if user exists
        console.log('Querying database for user:', username);
        const [user] = await db.query(
            'SELECT * FROM users WHERE username = ?', 
            [username]
        ).catch(err => {
            console.error('Database query failed:', err);
            throw err;
        });
        
        if (user.length === 0) {
            console.log('User not found:', username);
            return res.status(401).json({ 
                message: 'Invalid credentials',
                field: 'username'
            });
        }
        
        // Check password
        console.log('Comparing passwords for user:', user[0].username);
        const isMatch = await bcrypt.compare(password, user[0].password)
            .catch(err => {
                console.error('Bcrypt compare failed:', err);
                throw err;
            });
        
        if (!isMatch) {
            console.log('Password mismatch for user:', user[0].username);
            return res.status(401).json({ 
                message: 'Invalid credentials',
                field: 'password'
            });
        }
        
        // Create JWT
        console.log('Creating JWT for user:', user[0].id);
        const token = jwt.sign(
            { id: user[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        console.log('Login successful for user:', user[0].username);
        res.json({ 
            message: 'Login successful',
            token,
            user: {
                id: user[0].id,
                username: user[0].username,
                email: user[0].email
            }
        });
    } catch (err) {
        console.error('Login process failed:', err);
        res.status(500).json({ 
            message: 'Server error during login',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});


router.get('/me', async (req, res) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const [user] = await db.query(
            'SELECT id, username, email FROM users WHERE id = ?',
            [decoded.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user[0]);
    } catch (err) {
        console.error('Error in /me endpoint:', err);
        res.status(500).json({ 
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

module.exports = router;