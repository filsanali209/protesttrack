const express = require('express');
const admin = require("firebase-admin");
const { db } = require('../firebase');

const router = express.Router();

//Make sure Firebase Messaging is initialised
const messaging = admin.messaging();

//Send notifications to users
async function sendNotification(title, body, protestID, categoryID) {
  try {
      const usersSnapshot = await db.collection("users")
          .where("preferredCategories", "array-contains", categoryID)
          .where("fcmToken", "!=", null) // Ensure they have an FCM token
          .get();

      const tokens = usersSnapshot.docs.map(doc => doc.data().fcmToken);

      if (tokens.length === 0) {
          console.log("No users with this category preference. Skipping notification.");
          return;
      }

      const message = {
          notification: { title, body },
          tokens: tokens
      };

      const response = await admin.messaging().sendEachForMulticast(message);

      // Store notification in firestore
      await db.collection("notifications").add({
          title,
          body,
          protestID,
          categoryID,
          sent_at: new Date().toISOString(),
          recipients: tokens
      });

  } catch (error) {
      console.error("Error sending notification:", error);
  }
}


//Save FCM token for user (Only for regular users)
router.post('/save-fcm-token/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { fcmToken } = req.body;

        const userRef = await db.collection('users').doc(userId).get();

        if (!userRef.exists || userRef.data().role === "admin") {
            return res.status(403).json({ error: "Admins cannot receive notifications." });
        }

        await db.collection('users').doc(userId).update({ fcmToken });
        res.json({ message: "FCM token saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//API to send a test notification
router.post("/send-test", async (req, res) => {
    try {
        const { title, body, protestID } = req.body;
        await sendNotification(title, body, protestID);
        res.json({ message: "Test notification sent!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
module.exports.sendNotification = sendNotification;