const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth.js');

// add a new message
router.post('/:channelId/send', authenticateToken, async (req, res) => {

   const { message, userId } = req.body;
   const channelId = req.params.channelId;

   if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message content cannot be empty' });
   }

   try {
      // check if the channel exists
      const channelCheck = await pool.query('SELECT id FROM channels WHERE id = $1', [channelId]);
      if (channelCheck.rows.length === 0) {
         return res.status(404).json({ error: 'Channel not found' });
      }

      // check if user is existing in this channel
      const membershipCheck = await pool.query(
         'SELECT * FROM channel_user WHERE channel_id = $1 AND user_id = $2',
         [channelId, userId]
      );
      if (membershipCheck.rows.length === 0) {
         return res.status(403).json({ error: 'User is not a member of this channel' });
      }

      // add the message in db
      const result = await pool.query(
         `INSERT INTO message (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING channel_id, user_id, content, 
             (SELECT name FROM users WHERE id = $2) AS name`,
         [channelId, userId, message]
      );
      const newMessage = result.rows[0];

      const io = req.app.get('io');
      io.to(`channel_${channelId}`).emit('new_message', newMessage);

      return res.status(201).json(newMessage);
   } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
   }
});

// Получение истории сообщений канала
router.get('/:channelId/history', authenticateToken, async (req, res) => {
   const channelId = req.params.channelId;

   try {
      // Проверяем, существует ли канал
      const channelCheck = await pool.query('SELECT id FROM channels WHERE id = $1', [channelId]);
      if (channelCheck.rows.length === 0) {
         return res.status(404).json({ error: 'Channel not found' });
      }

      // Проверяем, состоит ли пользователь в канале
      const userId = req.user.userId; // ID пользователя из токена

      const membershipCheck = await pool.query(
         'SELECT * FROM channel_user WHERE channel_id = $1 AND user_id = $2',
         [channelId, userId]
      );
      if (membershipCheck.rows.length === 0) {
         return res.status(403).json({ error: 'User is not a member of this channel' });
      }

      // Получаем сообщения
      const messages = await pool.query(
         `SELECT 
            m.id, 
            m.content, 
            m.user_id, 
            u.name 
         FROM message m 
         JOIN users u ON m.user_id = u.id 
         WHERE m.channel_id = $1 
         ORDER BY m.id ASC;
`,
         [channelId]
      );

      return res.json(messages.rows);
   } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
   }
});


module.exports = router;