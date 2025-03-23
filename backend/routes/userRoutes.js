const express = require('express');
const admin = require("firebase-admin");
const { db } = require('../firebase');

const router = express.Router();

//Sign Up
router.post('/signup', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        //Create user in firebase auth with email & password
        const userRecord = await admin.auth().createUser({
            email,
            password
        });

        //Store user role in Firestore but NOT password
        let userData = { email, role };

        if (role === "user") {
            userData.preferredCategories = []; // Only for regular users
        }

        await db.collection('users').doc(userRecord.uid).set(userData);

        res.status(201).json({ message: "Signup successful!", userId: userRecord.uid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Save user preferences (Only for regular users)
router.post('/preferences/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { preferredCategories } = req.body;

        const userRef = await db.collection('users').doc(userId).get();
        if (!userRef.exists || userRef.data().role !== "user") {
            return res.status(403).json({ error: "Only users can set preferences." });
        }

        await db.collection('users').doc(userId).update({ preferredCategories });

        res.json({ message: "Preferences saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Login (firebase auth handles password check)
router.post('/login', async (req, res) => {
    res.status(400).json({ error: "Login is handled through Firebase Authentication." });
});

module.exports = router;