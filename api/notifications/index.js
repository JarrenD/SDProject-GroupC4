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
    const method = req.method;
    const notificationId = req.params.notification_id;

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
            // Retrieve all notifications
            case 'GET':
                if (notificationId) {
                    // Retrieve a specific notification by ID
                    const notificationSnapshot = await db.ref(`notification_logs/${notificationId}`).once('value');
                    const notification = notificationSnapshot.val();
                    if (!notification) {
                        context.res = {
                            status: 404,
                            body: `Notification with ID ${notificationId} not found`
                        };
                        return;
                    }
                    context.res = {
                        status: 200,
                        body: notification
                    };
                } else {
                    // Retrieve all notifications
                    const snapshot = await db.ref('notification_logs').once('value');
                    const notifications = snapshot.val();
                    context.res = {
                        status: 200,
                        body: notifications
                    };
                }
                break;

            // Create a new notification
            case 'POST':
                const newNotification = req.body;
                if (!newNotification || !newNotification.message || !newNotification.notification_id || !newNotification.timestamp || !newNotification.type || !newNotification.user_id) {
                    context.res = {
                        status: 400,
                        body: "Invalid notification data"
                    };
                    return;
                }

                // Save the new notification to the database
                const newNotificationRef = db.ref(`notification_logs/${newNotification.notification_id}`);
                await newNotificationRef.set(newNotification);

                context.res = {
                    status: 201,
                    body: `New notification added with ID: ${newNotification.notification_id}`
                };
                break;

            // Delete a notification by ID
            case 'DELETE':
                if (!notificationId) {
                    context.res = {
                        status: 400,
                        body: "Notification ID is required"
                    };
                    return;
                }

                const notificationToDeleteRef = db.ref(`notification_logs/${notificationId}`);
                const notificationToDeleteSnapshot = await notificationToDeleteRef.once('value');

                if (!notificationToDeleteSnapshot.exists()) {
                    context.res = {
                        status: 404,
                        body: `Notification with ID ${notificationId} not found`
                    };
                    return;
                }

                await notificationToDeleteRef.remove();

                context.res = {
                    status: 200,
                    body: `Notification with ID ${notificationId} deleted`
                };
                break;

            // Method not allowed
            default:
                context.res = {
                    status: 405,
                    body: "Method not allowed"
                };
                break;
        }
    } catch (error) {
        context.log(`Error handling request: ${error}`);
        context.res = {
            status: 500,
            body: `Error handling request: ${error}`
        };
    }
};
