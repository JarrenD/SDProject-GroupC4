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
    const method = req.method;
    const id = req.params.id;

    try {
        switch (method) {
            // Get all emergency contacts
            case 'GET':
                const snapshot = await db.ref('Emergency_Contacts').once('value');
                const contacts = snapshot.val();
                context.res = {
                    status: 200,
                    body: contacts
                };
                break;

            // Add a new emergency contact
            case 'POST':
                const newContact = req.body;
                if (!newContact || !newContact.name || !newContact.phone || !newContact.region) {
                    context.res = {
                        status: 400,
                        body: "Invalid contact data"
                    };
                    return;
                }

                // Generate a new ID for the contact
                const newContactRef = db.ref('Emergency_Contacts').push();
                newContact.id = newContactRef.key;
                await newContactRef.set(newContact);

                context.res = {
                    status: 201,
                    body: `New contact added with ID: ${newContact.id}`
                };
                break;

            // Update an existing contact by ID
            case 'PUT':
                if (!id) {
                    context.res = {
                        status: 400,
                        body: "Contact ID is required"
                    };
                    return;
                }

                const updatedContact = req.body;
                if (!updatedContact || !updatedContact.name || !updatedContact.phone || !updatedContact.region) {
                    context.res = {
                        status: 400,
                        body: "Invalid contact data"
                    };
                    return;
                }

                const contactToUpdateRef = db.ref(`Emergency_Contacts/${id}`);
                const contactToUpdateSnapshot = await contactToUpdateRef.once('value');

                if (!contactToUpdateSnapshot.exists()) {
                    context.res = {
                        status: 404,
                        body: `Contact with ID ${id} not found`
                    };
                    return;
                }

                await contactToUpdateRef.update(updatedContact);

                context.res = {
                    status: 200,
                    body: `Contact with ID ${id} updated`
                };
                break;

            // Delete a contact by ID
            case 'DELETE':
                if (!id) {
                    context.res = {
                        status: 400,
                        body: "Contact ID is required"
                    };
                    return;
                }

                const contactToDeleteRef = db.ref(`Emergency_Contacts/${id}`);
                const contactToDeleteSnapshot = await contactToDeleteRef.once('value');

                if (!contactToDeleteSnapshot.exists()) {
                    context.res = {
                        status: 404,
                        body: `Contact with ID ${id} not found`
                    };
                    return;
                }

                await contactToDeleteRef.remove();

                context.res = {
                    status: 200,
                    body: `Contact with ID ${id} deleted`
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
