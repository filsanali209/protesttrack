const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const { db } = require('../firebase');
const categoriseProtest = require('../utils/categoriseProtests');
const notificationRoutes = require('./notificationRoutes');
const sendNotification = notificationRoutes.sendNotification;

const router = express.Router();

// Function to get latitude and longitude from address
async function geocodeAddress(address) {
    const API_KEY = 'B0xHNKvNU8k5BRV3qJRXEQGFIAk=';  
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
    
    try {
        const response = await axios.get(geocodeUrl);
        const result = response.data.results[0];

        if (result) {
            const latitude = result.geometry.location.lat;
            const longitude = result.geometry.location.lng;
            return { latitude, longitude };
        } else {
            throw new Error('Address not found');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        throw new Error('Failed to geocode address');
    }
}


// Create Protest (Admin Only)
router.post('/', adminAuth, async (req, res) => {
    try {
        let protestData = req.body;

        // Categorise protest based on title & description
        const { categoryID, categoryName } = await categoriseProtest(protestData.title, protestData.description);
        protestData = { ...protestData, categoryID, categoryName, status: "pending" };

        const protestRef = await db.collection('protests').add(protestData);

        // Send notif to users
        await sendNotification("New Protest Added", protestData.title, protestRef.id);

        res.status(201).json({ id: protestRef.id, message: "Protest added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Approve a Protest (Admin Only)
router.patch('/:protestId/approve', adminAuth, async (req, res) => {
  try {
      const { protestId } = req.params;

      //Get the protest from Firestore
      const protestRef = db.collection('protests').doc(protestId);
      const protestDoc = await protestRef.get();

      if (!protestDoc.exists) {
          console.error("Protest not found!");
          return res.status(404).json({ error: "Protest not found!" });
      }

      const protestData = protestDoc.data();

      //Update protest status to "approved"
      await protestRef.update({ status: "approved" });


      //Send a notification to users who prefer this category
     // await sendNotification("Protest Approved", `The protest "${protestData.title}" has been approved!`, protestId, protestData.categoryID);

      res.json({ message: "Protest approved successfully!" });
  } catch (error) {
      console.error("Error approving protest:", error);
      res.status(500).json({ error: error.message });
  }
});

//Get all approved protests
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('protests').where("status", "==", "approved").get();
        const protests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(protests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single protest
router.get('/:protestId', async (req, res) => {
    try {
        const { protestId } = req.params;  

        const protestRef = db.collection('protests').doc(protestId);
        const protestDoc = await protestRef.get();

        if (!protestDoc.exists) {
            return res.status(404).json({ error: "Protest not found!" });
        }

        res.status(200).json(protestDoc.data());  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;