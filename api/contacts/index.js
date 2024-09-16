const admin = require('firebase-admin');
const functions = require('@azure/functions');

// Initialize Firebase Admin SDK with service account credentials from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://creativetutorial-ba1bf-default-rtdb.firebaseio.com'
});

const db = admin.database();
const ref = db.ref('Emergency_Contacts');

module.exports = async function (context, req) {
    const method = req.method;
    switch (method) {
        case 'GET':
            await getContacts(context);
            break;
        case 'POST':
            await addContact(context, req.body);
            break;
        case 'PUT':
            await updateContact(context, req.params.id, req.body);
            break;
        case 'DELETE':
            await deleteContact(context, req.query.index);
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
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        context.res = {
            status: 200,
            body: data
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        context.res = {
            status: 500,
            body: 'Internal Server Error'
        };
    }
}

async function addContact(context, newContact) {
    try {
        await ref.push(newContact);
        context.res = {
            status: 201,
            body: newContact
        };
    } catch (error) {
        console.error('Error adding contact:', error);
        context.res = {
            status: 500,
            body: 'Internal Server Error'
        };
    }
}

async function updateContact(context, id, updatedContact) {
    try {
        await ref.child(id).update(updatedContact);
        context.res = {
            status: 200,
            body: updatedContact
        };
    } catch (error) {
        console.error('Error updating contact:', error);
        context.res = {
            status: 500,
            body: 'Internal Server Error'
        };
    }
}

async function deleteContact(context, index) {
    try {
        await ref.child(index).remove();
        context.res = {
            status: 200,
            body: { message: `Contact with index ${index} deleted` }
        };
    } catch (error) {
        console.error('Error deleting contact:', error);
        context.res = {
            status: 500,
            body: 'Internal Server Error'
        };
    }
}
