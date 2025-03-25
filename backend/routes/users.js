require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth.js');

const JWT_SECRET = process.env.JWT_SECRET;


//endpoint to search all users
router.get('/searchUsers', authenticateToken, async (req, res) => {
   try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
   } catch (error) {
      res.json({ error: error.message });
   }
});

//endpoint to search users that added in channel
router.get('/searchAddedUsers/:id', authenticateToken, async (req, res) => {
   const channelId = req.params.id;
   try {
      const result = await pool.query('SELECT user_id FROM channel_user where channel_id = $1', [channelId]);
      res.json(result.rows);
   } catch (error) {
      res.json({ error: error.message });
   }
});

//endpoint for registration
router.post('/register', async (req, res) => {
   const { name, password } = req.body;
   
   if (!name || !password) {
      return res.json({ error: 'Name and password are required' });
   }
   try {
      const existingUser = await pool.query(
         `select * from users where name = $1`,
         [name]
      );

      if (existingUser.rows.length > 0) {
         return res.status(404).json({ error: "user already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
         'insert into users (name,password) values ($1, $2) returning *',
         [name,hashedPassword]
      );

      const newUser = result.rows[0];

       // Create JWT
     const token = jwt.sign(
      { userId: newUser.id, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '12h' } // token will be exist for 12h
    );

    res.status(201).json({ token });

   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
      
   }
})

//endpoint for authorization
router.post('/login', async (req, res) => {
   const { name, password } = req.body;
 
   if (!name || !password) {
     return res.json({ error: 'Name and password are required' });
   }
 
   try {
     // check for user existence
     const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
 
     if (result.rows.length === 0) {
       return res.json({ error: 'User not found' });
     }
 
     const user = result.rows[0];
 
     // compair passwords
     const isPasswordValid = await bcrypt.compare(password, user.password);
 
     if (!isPasswordValid) {
       return res.json({ error: 'Invalid credentials' });
     }
 
     // Create JWT
     const token = jwt.sign(
       { userId: user.id, name: user.name },
       JWT_SECRET,
       { expiresIn: '12h' } // token will be exist for 12h
     );
 
     res.json({ token });
 
   } catch (error) {
     console.error(error);
     res.json({ error: 'Server error' });
   }
 });

module.exports = router;