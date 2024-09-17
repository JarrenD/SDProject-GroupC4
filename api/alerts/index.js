const admin = require('firebase-admin');
const path = require('path');
const serviceAccountKeyPath = path.resolve(__dirname, '../firebase-key.json'); // Path to the decoded service account key

// Initialize Firebase Admin SDK with the service account key if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKeyPath),
        databaseURL: 'https://creativetutorial-ba1bf-default-rtdb.firebaseio.com' // Your Firebase database URL
    });
}

const db = admin.database();

module.exports = async function (context, req) {
    const { method } = req;
    const alertId = req.params.alert_id;

    try {
        switch (method) {
            case 'GET':
                if (alertId) {
                    // Retrieve a specific alert by ID
                    const snapshot = await db.ref(`Incident_Alerts/${alertId}`).once('value');
                    const alert = snapshot.val();
                    if (alert) {
                        context.res = {
                            status: 200,
                            body: alert
                        };
                    } else {
                        context.res = {
                            status: 404,
                            body: 'Alert not found'
                        };
                    }
                } else {
                    context.res = {
                        status: 400,
                        body: 'Alert ID is required'
                    };
                }
                break;

            case 'POST':
                // Send a new emergency alert
                const alertData = req.body;
                if (alertData.title && alertData.message) {
                    const newAlertRef = db.ref('Incident_Alerts').push();
                    await newAlertRef.set(alertData);
                    context.res = {
                        status: 201,
                        body: { id: newAlertRef.key, ...alertData }
                    };
                } else {
                    context.res = {
                        status: 400,
                        body: 'Title and message are required'
                    };
                }
                break;

            default:
                context.res = {
                    status: 405,
                    body: 'Method Not Allowed'
                };
        }
    } catch (error) {
        context.log(`Error handling request: ${error}`);
        context.res = {
            status: 500,
            body: `Error handling request: ${error}`
        };
    }
};
