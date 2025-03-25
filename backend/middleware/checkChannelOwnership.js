const pool = require('../config/db');
// Middleware for check user permissions
async function checkChannelOwnership(req, res, next) {
   const channelId = req.params.id; 
   const userId = req.user.userId; 
 
   try {
     const result = await pool.query('SELECT user_id FROM channels WHERE id = $1', [channelId]);
     const channel = result.rows[0];
     
     if (!channel) {
       return res.status(404).json({ error: 'Channel not found' });
     }
 
     if (channel.user_id !== userId) {
       return res.status(403).json({ error: 'You do not have permission to delete this channel' });
     }

     next();
   } catch (err) {
     console.error('Database error:', err);
     return res.status(500).json({ error: 'Internal server error' });
   }
 }

 module.exports = checkChannelOwnership;