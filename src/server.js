import express from 'express';
import locationApi from './api/locationApi.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Use the location API
app.use('/api/location', locationApi);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
