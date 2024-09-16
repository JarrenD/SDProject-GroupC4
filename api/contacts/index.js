const admin = require('firebase-admin');
const path = require('path');
const serviceAccountKeyPath = path.resolve(__dirname, '../firebase-key.json'); // Path to the decoded service account key

// Initialize Firebase Admin SDK with the service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKeyPath),
  databaseURL: 'https://creativetutorial-ba1bf-default-rtdb.firebaseio.com' // Your Firebase database URL
});

const db = admin.database();

module.exports = async function (context, req) {
    try {
        const snapshot = await db.ref('Emergency_Contacts').once('value');
        const contacts = snapshot.val();
        context.res = {
            status: 200,
            body: contacts
        };
    } catch (error) {
        context.log(`Error fetching data: ${error}`);
        context.res = {
            status: 500,
            body: `Error fetching data: ${error}`
        };
    }
};
