// --- Start of functions/index.js ---
const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

// 1. Initialize Firebase Admin SDK
admin.initializeApp();

// 2. Initialize Database Connection (Mongoose)
// This service must run when the function starts up
const connectDB = require('./services/db/mongoConnect');
connectDB(); 

const app = express();
app.use(express.json());

// 3. Import ADANiD Identity Routes
const identityRoutes = require('./routes/identityRoutes');
app.use('/api/v1/identity', identityRoutes); 

// Root Route for Status Check
app.get('/', (req, res) => {
    res.status(200).send('ADANiD Genesis Core API is Active and DB initialized.');
});

// 4. Export the Express API as a single Firebase Function
exports.api = functions.https.onRequest(app);

// --- End of functions/index.js ---
