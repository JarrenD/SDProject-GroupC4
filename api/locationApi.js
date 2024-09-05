import express from 'express';
import { ref, set, get, remove, child } from 'firebase/database';
import { db } from '../../../src/models/firebase/firebaseConfig.js';

const router = express.Router();

// POST /api/location/share
router.post('/share', async (req, res) => {
    const { user_id, latitude, longitude, timestamp } = req.body;

    if (!user_id || !latitude || !longitude || !timestamp) {
        return res.status(400).json({ success: false, message: 'Missing required parameters.' });
    }

    try {
        const locationData = {
            latitude,
            longitude,
            timestamp
        };

        await set(ref(db, `locations/${user_id}`), locationData);

        res.status(200).json({ success: true, message: 'Location shared successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/location/users
router.get('/users', async (req, res) => {
    const { user_id, timestamp } = req.query;

    try {
        let locationRef;

        if (user_id) {
            locationRef = ref(db, `locations/${user_id}`);
        } else {
            locationRef = ref(db, 'locations');
        }

        const snapshot = await get(locationRef);

        if (!snapshot.exists()) {
            return res.status(404).json({ success: false, message: 'No location data found.' });
        }

        let data = snapshot.val();

        // Filter by timestamp if provided
        if (timestamp) {
            data = Object.keys(data)
                .filter(key => data[key].timestamp === timestamp)
                .reduce((obj, key) => {
                    obj[key] = data[key];
                    return obj;
                }, {});
        }

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/location/stop
router.delete('/stop', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ success: false, message: 'Missing user_id.' });
    }

    try {
        await remove(ref(db, `locations/${user_id}`));

        res.status(200).json({ success: true, message: 'Location sharing stopped successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
