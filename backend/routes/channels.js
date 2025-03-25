const express = require('express');
const router = express.Router();
const pool = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');
const checkChannelOwnership = require('../middleware/checkChannelOwnership.js')

//check owner
router.get('/:id/ownership', authenticateToken, async (req, res) => {
   const channelId = req.params.id;
   const userId = req.user.userId;

   try {
      const result = await pool.query('SELECT user_id FROM channels WHERE id = $1', [channelId]);
      const channel = result.rows[0];

      if (!channel) {
         return res.status(404).json({ error: 'Канал не найден' });
      }

      const isOwner = channel.user_id === userId;
      res.json({ isOwner });
   } catch (error) {
      console.error('Ошибка проверки владельца канала:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
   }
});

//endpoint for create a new channel
router.post('/createChannel', authenticateToken, async (req, res) => {
   const { channelName, userId } = req.body;
   const checkExistChannel = await pool.query(
      'SELECT * FROM channels WHERE title = $1',
      [channelName]
   );

   if (checkExistChannel.rows.length > 0) {
      return res.status(400).json({ error: 'Channel is already exist' });
   }

   try {
      const result = await pool.query(
         'insert into channels (title, user_id) values ($1,$2) returning *',
         [channelName, userId]
      );
      res.json(result.rows[0])
   } catch (error) {
      res.json({ error: error.message });
   }
});

//get title by id
router.get('/channel/:id', authenticateToken, async (req, res) => {
   const channelId = req.params.id;

   try {
      const result = await pool.query('SELECT title FROM channels WHERE id = $1', [channelId]);

      if (result.rows.length === 0) {
         return res.status(404).json({ error: 'Channel not found' });
      }

      const channelTitle = result.rows[0].title;
      res.json({ channelTitle });
   } catch (error) {
      console.error('Error retrieving channel:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

//endpoint for getting all channels
router.get('/getChannels', authenticateToken, async (req, res) => {
   try {
      const result = await pool.query('SELECT * FROM channels');
      res.json(result.rows);
   } catch (error) {
      res.json({ error: error.message });
   }
});

//Channels for subscribers
router.get('/getChannelsForSub', authenticateToken, async (req, res) => {
   try {
      const userId = req.user.userId;

      const result = await pool.query(
         `SELECT c.* FROM channels c
          JOIN channel_user cu ON c.id = cu.channel_id
          WHERE cu.user_id = $1`,
         [userId]
      );

      res.json(result.rows);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// endpoint for deleting channel
router.delete('/:id/delete', authenticateToken, checkChannelOwnership, async (req, res) => {
   const channelId = req.params.id;
   try {
      await pool.query('DELETE FROM channel_user WHERE channel_id = $1', [channelId]);
      await pool.query('DELETE FROM channels WHERE id = $1', [channelId]);
      res.status(204).send();
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// endpoint for exit from channel
router.delete('/:id/exit', authenticateToken, async (req, res) => {
   const userId = req.user.userId;
   const channelId = req.params.id;
   try {
      await pool.query('DELETE FROM channel_user WHERE user_id = $1 and channel_id = $2', [userId,channelId]);
      res.status(204).send();
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// enter in a channel
router.post('/:id/join', authenticateToken, async (req, res) => {
   try {
      const channelId = req.params.id;
      const { name } = req.body;

      // Search person with this name
      const searchPersonId = await pool.query(
         `select * from users where name = $1`,
         [name]
      )
      if (searchPersonId.rows.length === 0) {
         return res.status(400).json({ error: 'User dosent exist' });
      }

      const userId = searchPersonId.rows[0]?.id;

      // Check if user is on a channel
      const membershipCheck = await pool.query(
         'SELECT * FROM channel_user WHERE channel_id = $1 AND user_id = $2',
         [channelId, userId]
      );

      if (membershipCheck.rows.length > 0) {
         return res.status(400).json({ error: 'User is already in the channel' });
      }

      // adding user to channel
      await pool.query(
         'INSERT INTO channel_user (channel_id, user_id) VALUES ($1, $2)',
         [channelId, userId]
      );

      return res.status(200).json({ message: 'User successfully joined the channel' });
   } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
   }
});


module.exports = router;