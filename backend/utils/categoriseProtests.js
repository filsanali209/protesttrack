const { db } = require('../firebase');

//Fetches categories from firestore and categorises protest on title & description.
async function categoriseProtest(title = "", content = "") {
    try {
        //Fetch categories from Firestore
        const categoriesSnapshot = await db.collection('categories').get();
        const categories = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            keywords: doc.data().keywords || []
        }));

        const text = `${title} ${content}`.toLowerCase(); //Convert to lowercase for keyword matching

        //Check if any category keywords match the protest text
        for (let category of categories) {
            if (category.keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
                return { categoryID: category.id, categoryName: category.name };
            }
        }

        return { categoryID: "Uncategorised", categoryName: "Uncategorised" };
    } catch (error) {
        return { categoryID: "Uncategorised", categoryName: "Uncategorised" };
    }
}

module.exports = categoriseProtest;