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
    const resourceId = req.params.id;
    const ref = db.ref('Safety_Resources');

    switch (req.method) {
        case 'GET':
            if (resourceId) {
                // Get a single resource by ID
                try {
                    const snapshot = await ref.child(resourceId).once('value');
                    const resource = snapshot.val();
                    if (resource) {
                        context.res = {
                            status: 200,
                            body: resource
                        };
                    } else {
                        context.res = {
                            status: 404,
                            body: `Resource with ID ${resourceId} not found`
                        };
                    }
                } catch (error) {
                    context.log(`Error fetching resource: ${error}`);
                    context.res = {
                        status: 500,
                        body: `Error fetching resource: ${error}`
                    };
                }
            } else {
                // Get all resources
                try {
                    const snapshot = await ref.once('value');
                    const resources = snapshot.val();
                    context.res = {
                        status: 200,
                        body: resources
                    };
                } catch (error) {
                    context.log(`Error fetching resources: ${error}`);
                    context.res = {
                        status: 500,
                        body: `Error fetching resources: ${error}`
                    };
                }
            }
            break;
        case 'POST':
            // Add a new resource
            try {
                const newResource = req.body;
                const newRef = ref.push(); // Generates a new unique ID for the resource
                await newRef.set(newResource);
                context.res = {
                    status: 201,
                    body: { id: newRef.key, ...newResource }
                };
            } catch (error) {
                context.log(`Error adding resource: ${error}`);
                context.res = {
                    status: 500,
                    body: `Error adding resource: ${error}`
                };
            }
            break;
        case 'PUT':
            // Update an existing resource by ID
            if (resourceId) {
                try {
                    const updatedResource = req.body;
                    await ref.child(resourceId).update(updatedResource);
                    context.res = {
                        status: 200,
                        body: { id: resourceId, ...updatedResource }
                    };
                } catch (error) {
                    context.log(`Error updating resource: ${error}`);
                    context.res = {
                        status: 500,
                        body: `Error updating resource: ${error}`
                    };
                }
            } else {
                context.res = {
                    status: 400,
                    body: 'Resource ID is required for updating'
                };
            }
            break;
        case 'DELETE':
            // Delete a resource by ID
            if (resourceId) {
                try {
                    await ref.child(resourceId).remove();
                    context.res = {
                        status: 200,
                        body: `Resource with ID ${resourceId} deleted successfully`
                    };
                } catch (error) {
                    context.log(`Error deleting resource: ${error}`);
                    context.res = {
                        status: 500,
                        body: `Error deleting resource: ${error}`
                    };
                }
            } else {
                context.res = {
                    status: 400,
                    body: 'Resource ID is required for deleting'
                };
            }
            break;
        default:
            context.res = {
                status: 405,
                body: 'Method not allowed'
            };
            break;
    }
};
