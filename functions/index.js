// --- Start of functions/index.js ---
const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();
app.use(express.json());

// Import ADANiD Identity Routes
const identityRoutes = require('./routes/identityRoutes');
app.use('/api/v1/identity', identityRoutes); 

// Root Route for Status Check
app.get('/', (req, res) => {
    res.status(200).send('ADANiD Genesis Core API is Active on Firebase Functions.');
});

// Export the Express API as a single Firebase Function called 'api'
exports.api = functions.https.onRequest(app);

// --- End of functions/index.js ---
