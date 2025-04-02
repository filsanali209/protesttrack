const admin = require("firebase-admin");
const { db } = require('../firebase');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split("Bearer ")[1]; 
        if (!token) return res.status(403).json({ error: "No token provided" });

        //Verify firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        //Check if the user exists & is an admin
        const userRef = await db.collection('users').doc(userId).get();
        if (!userRef.exists || userRef.data().role !== 'admin') {
            return res.status(403).json({ message: "Access denied!" });
        }

        req.user = decodedToken; //attach user info to request
        next(); //Next middleware
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(500).json({ error: "Authorisation error!" });
    }
};

module.exports = adminAuth;