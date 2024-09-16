const admin = require('firebase-admin');
const { HttpFunctionContext, HttpRequest } = require('@azure/functions');
const path = require('path');

// Initialize Firebase Admin with Service Account
if (!admin.apps.length) {
    const serviceAccountPath = path.join(__dirname, '../creativetutorial-ba1bf-firebase-adminsdk-9p4al-0c98afc609.json'); // Update this path
    admin.initializeApp({
        credential: admin.credential.cert(require(serviceAccountPath)),
        databaseURL: 'https://creativetutorial-ba1bf-default-rtdb.firebaseio.com'
    });
}

const db = admin.database();

module.exports = async function (context, req) {
    const method = req.method;
    switch (method) {
        case 'GET':
            await getContacts(context);
            break;
        default:
            context.res = {
                status: 405,
                body: 'Method Not Allowed'
            };
            break;
    }
};

async function getContacts(context) {
    try {
        const contactsRef = db.ref('Emergency_Contacts'); // Use db.ref() for Firebase Admin SDK
        const snapshot = await contactsRef.once('value'); // Use once() to get data

        if (snapshot.exists()) {
            const data = snapshot.val();
            context.res = {
                status: 200,
                body: data
            };
        } else {
            context.res = {
                status: 404,
                body: 'No data available'
            };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        context.res = {
            status: 500,
            body: 'Internal Server Error'
        };
    }
}
