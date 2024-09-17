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
    const incidentId = req.params.incident_id;

    try {
        switch (method) {
            case 'GET':
                if (incidentId) {
                    // Retrieve specific incident report
                    const snapshot = await db.ref(`Incident_Alerts/${incidentId}`).once('value');
                    const incident = snapshot.val();
                    if (incident) {
                        context.res = {
                            status: 200,
                            body: incident
                        };
                    } else {
                        context.res = {
                            status: 404,
                            body: `Incident with ID ${incidentId} not found`
                        };
                    }
                } else {
                    // Retrieve all incident reports
                    const snapshot = await db.ref('Incident_Alerts').once('value');
                    const incidents = snapshot.val();
                    context.res = {
                        status: 200,
                        body: incidents
                    };
                }
                break;

            case 'POST':
                // Submit new incident report
                const newIncident = req.body;
                const newIncidentRef = db.ref('Incident_Alerts').push();
                await newIncidentRef.set(newIncident);
                context.res = {
                    status: 201,
                    body: { id: newIncidentRef.key, ...newIncident }
                };
                break;

            case 'PUT':
                if (incidentId) {
                    // Update existing incident report
                    const updatedIncident = req.body;
                    await db.ref(`Incident_Alerts/${incidentId}`).update(updatedIncident);
                    context.res = {
                        status: 200,
                        body: { id: incidentId, ...updatedIncident }
                    };
                } else {
                    context.res = {
                        status: 400,
                        body: 'Incident ID is required for update'
                    };
                }
                break;

            case 'DELETE':
                if (incidentId) {
                    // Delete specific incident report
                    await db.ref(`Incident_Alerts/${incidentId}`).remove();
                    context.res = {
                        status: 204
                    };
                } else {
                    context.res = {
                        status: 400,
                        body: 'Incident ID is required for deletion'
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
