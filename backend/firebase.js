const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();


const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };
