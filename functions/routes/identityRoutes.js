// --- Start of functions/routes/identityRoutes.js ---
const express = require('express');
const router = express.Router();
// We import the controller functions that will handle the logic
const identityController = require('../controllers/identityController'); 

// 1. Identity Creation (Register Super ID)
// Path: POST /api/v1/identity/register
router.post('/register', identityController.registerIdentity);

// 2. Identity Verification (Login / Biometric Check)
// Path: POST /api/v1/identity/verify
router.post('/verify', identityController.verifyIdentity);

// 3. Status Check (For Continuous Authentication Protocol - CAP)
// Path: GET /api/v1/identity/status/:superID
router.get('/status/:superID', identityController.checkStatus);

// 4. Atomic Session Lock (Security feature)
// Path: POST /api/v1/identity/lock
router.post('/lock', identityController.lockSession);


module.exports = router;
// --- End of functions/routes/identityRoutes.js ---
