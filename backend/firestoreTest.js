const { db } = require("./firebase");

async function testFirestore() {
    try {
        const testRef = db.collection("test");
        const docRef = await testRef.add({ message: "Firestore connection test!", timestamp: new Date() });
        console.log(`Firestore is connected! Test document added with ID: ${docRef.id}`);
    } catch (error) {
        console.error("Firestore connection failed:", error.message);
    }
}

testFirestore();
