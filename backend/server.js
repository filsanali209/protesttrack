const express = require("express");
const { db } = require("./firebase"); 

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Test Firestore connection
app.get("/test-firestore", async (req, res) => {
  try {
    await db.collection("test").add({ message: "Firestore is working!" });
    res.send("Firestore is connected!");
  } catch (error) {
    res.status(500).send("Error connecting to Firestore: " + error.message);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
