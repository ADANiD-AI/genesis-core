// --- Start of functions/services/db/mongoConnect.js ---
const mongoose = require('mongoose');
const functions = require('firebase-functions');

// Load MongoDB URI from Firebase Environment Configuration
// NOTE: You must set the URI using the Firebase CLI command:
// firebase functions:config:set mongodb.uri="YOUR_MONGO_CONNECTION_STRING"
const MONGO_URI = functions.config().mongodb?.uri;

let isConnected;

const connectDB = async () => {
    if (isConnected) {
        console.log('=> Using existing database connection.');
        return;
    }

    if (!MONGO_URI) {
        console.error('FATAL ERROR: MongoDB URI is not set in Firebase config.');
        return;
    }

    try {
        const db = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log('=> New MongoDB connection established.');
    } catch (error) {
        console.error('Could not connect to database:', error);
    }
};

module.exports = connectDB;
// --- End of functions/services/db/mongoConnect.js ---
