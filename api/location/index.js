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
    const userId = req.params.user_id;

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
                // Retrieve location of all users
                const snapshot = await db.ref('locations').once('value');
                const locations = snapshot.val();
                context.res = {
                    status: 200,
                    body: locations
                };
                break;

            case 'POST':
                // Share location (add location to database)
                const locationData = req.body;
                if (locationData.user_id) {
                    await db.ref(`locations/${locationData.user_id}`).set(locationData);
                    context.res = {
                        status: 201,
                        body: locationData
                    };
                } else {
                    context.res = {
                        status: 400,
                        body: 'User ID is required'
                    };
                }
                break;

            case 'DELETE':
                if (userId) {
                    // Stop sharing location (delete user location)
                    await db.ref(`locations/${userId}`).remove();
                    context.res = {
                        status: 204
                    };
                } else {
                    context.res = {
                        status: 400,
                        body: 'User ID is required for deletion'
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
