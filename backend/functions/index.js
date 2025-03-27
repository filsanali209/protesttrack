/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.deleteExpiredProtests = functions.pubsub.schedule("every 24 hours").onRun(async () => {
  try {
    const now = new Date(); 
    console.log(`Deleting protests with date before ${now.toISOString()}`);

    const protestsSnapshot = await db.collection("protests")
      .where("date", "<", now)
      .get();

    if (protestsSnapshot.empty) {
      console.log("No expired protests found.");
      return null;
    }

    const batch = db.batch();
    protestsSnapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    console.log(`Deleted ${protestsSnapshot.size} expired protests.`);
    return null;
  } catch (error) {
    console.error("Error deleting expired protests:", error);
  }
});