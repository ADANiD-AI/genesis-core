import { createHmac, createHash } from 'crypto';

// A securely generated secret key should be stored as an environment variable.
const HASHING_SECRET = process.env.GENESIS_HASHING_SECRET || 'a_default_secret_for_development';

interface BiometricData {
  fingerprintHash: string;
  irisHash: string;
  facialHash: string;
  voiceHash: string;
  behavioralPattern: string;
}

/**
 * Combines multiple biometric inputs into one secure hash.
 * @param biometricData - An object containing various biometric hashes.
 * @param uniqueSalt - A unique salt for this specific hash, like a user ID or timestamp.
 * @returns A secure SuperID hash.
 */
export function generateSuperIDHash(biometricData: BiometricData, uniqueSalt: string): string {
  if (!biometricData || !uniqueSalt) {
    throw new Error("Biometric data and unique salt are required for hashing.");
  }

  // Combine all unique biometric data into a single string
  const combinedData =
    biometricData.fingerprintHash +
    biometricData.irisHash +
    biometricData.facialHash +
    biometricData.voiceHash +
    biometricData.behavioralPattern +
    uniqueSalt;

  // Use the built-in crypto module for HMAC-SHA512
  const superIDHash = createHmac('sha512', HASHING_SECRET)
    .update(combinedData)
    .digest('hex');

  return superIDHash;
}

/**
 * Hashes raw data using SHA-512.
 * In a real system, this might be done on secure hardware.
 * @param rawData - The raw data to hash.
 * @returns The SHA-512 hash of the data, or null if input is null.
 */
export function hashRawData(rawData: string | null): string | null {
  if (!rawData) return null;
  return createHash('sha512').update(rawData).digest('hex');
}
