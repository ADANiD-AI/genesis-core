// --- Start of functions/utils/security/hashUtils.js ---
const CryptoJS = require('crypto-js');
const { GENESIS_PROTOCOL } = require('../../config/settings');
const { SHA3_512 } = CryptoJS.algo;

// Master Hashing Function for 5-Layer Biometric Super ID
function generateSuperIDHash(biometricData, uniqueSalt) {
    if (!biometricData || !uniqueSalt) {
        throw new Error("Biometric data (5 layers) and unique salt are required.");
    }
    
    // Combine all 5 layers + uniqueSalt for the final Super ID Hash
    const combinedData = 
        (biometricData.fingerprintHash || '') + 
        (biometricData.irisHash || '') + 
        (biometricData.facialHash || '') + 
        (biometricData.voiceHash || '') + 
        (biometricData.behavioralPattern || '') +
        uniqueSalt;

    // Use HmacSHA3 with the algorithm defined in the Genesis Protocol settings
    const superIDHash = CryptoJS.HmacSHA3(combinedData, GENESIS_PROTOCOL.HASHING_ALGORITHM, { outputLength: 512 }).toString(CryptoJS.enc.Hex);

    return superIDHash;
}

module.exports = {
    generateSuperIDHash
};
// --- End of functions/utils/security/hashUtils.js ---
