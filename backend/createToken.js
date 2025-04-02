const express = require('express');
const { admin } = require('./firebase');  // Import the already initialized Firebase Admin SDK
const router = express.Router();

// Endpoint to generate Firebase custom token
router.post('/generate-id-token', async (req, res) => {
  try {
    const uid = req.body.uid;  // UID of the admin user to generate token for

    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }

    // Generate a Firebase custom token for the given UID
    const customToken = await admin.auth().createCustomToken(uid);

    // Respond with the token
    res.status(200).json({ token: customToken });
  } catch (error) {
    console.error('Error generating custom token:', error);
    res.status(500).json({ error: 'Error generating custom token', details: error.message });
  }
});

module.exports = router;  // Export this route to be used in the server.js