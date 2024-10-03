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
    const { page = 1, pageSize = 5 } = req.query; // Default to page 1, 5 items per page
    const offset = (page - 1) * pageSize; // Calculate the offset

        // Add CORS headers to every response
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*', // or 'http://localhost:3000' to be more specific
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    // Handle preflight requests (OPTIONS method)
    if (method === 'OPTIONS') {
        context.res = {
            status: 204, // No Content
            headers: corsHeaders
        };
        return;
    }

    try {
        switch (method) {
            case 'GET':
                if (alertId) {
                    // Retrieve a specific alert by ID
                    const snapshot = await db.ref(`notifications/${alertId}`).once('value');
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
                    const snapshot = await db.ref('notifications').once('value');
                const alert = snapshot.val();
                context.res = {
                    status: 200,
                    headers: corsHeaders,
                    body: alert
                };
                }
                break;

            case 'POST':
                // Send a new emergency alert
                const alertData = req.body;
                if (alertData.title && alertData.message) {
                    const newAlertRef = db.ref('notifications').push();
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
