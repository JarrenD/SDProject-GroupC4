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
    try {
        if (req.method === 'GET') {
            if (req.params.id) {
                // GET /resources/{id}
                const snapshot = await db.ref(`Safety_Resources/${req.params.id}`).once('value');
                const resource = snapshot.val();
                context.res = {
                    status: 200,
                    body: resource
                };
            } else {
                // GET /resources
                const snapshot = await db.ref('Safety_Resources').once('value');
                const resources = snapshot.val();
                context.res = {
                    status: 200,
                    body: resources
                };
            }
        } else if (req.method === 'POST') {
            // POST /resources
            const newResource = req.body;
            const ref = db.ref('Safety_Resources').push();
            await ref.set(newResource);
            context.res = {
                status: 201,
                body: { id: ref.key, ...newResource }
            };
        } else if (req.method === 'PUT') {
            // PUT /resources/{id}
            const updatedResource = req.body;
            await db.ref(`Safety_Resources/${req.params.id}`).update(updatedResource);
            context.res = {
                status: 200,
                body: { id: req.params.id, ...updatedResource }
            };
        } else if (req.method === 'DELETE') {
            // DELETE /resources/{id}
            await db.ref(`Safety_Resources/${req.params.id}`).remove();
            context.res = {
                status: 204
            };
        } else {
            context.res = {
                status: 405,
                body: "Method not allowed"
            };
        }
    } catch (error) {
        context.log(`Error processing request: ${error}`);
        context.res = {
            status: 500,
            body: `Error processing request: ${error}`
        };
    }
};
