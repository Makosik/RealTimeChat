const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware for checking token
function authenticateToken(req, res, next) {
   const authHeader = req.headers['authorization'];
   const token = authHeader;
 
   if (!token) {
     return res.status(401).json({ error: 'Access token is missing' });
   }
 
   jwt.verify(token, JWT_SECRET, (err, user) => {
     if (err) {
       return res.status(403).json({ error: 'Invalid or expired token' });
     }
 
     req.user = user;
     next();
   });
 }
 
 
 module.exports = authenticateToken;