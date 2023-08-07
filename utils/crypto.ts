// External Helpers ------------------------------------------------------------

/**
 * Encrypts a JSON object using AES-GCM algorithm with a 256-bit key.
 * @param data A JSON object with the data to be encrypted.
 * @param key A string with the key to be used to encrypt the data (no need to be 256-bit).
 * @throws An error if is not possible to encrypt the data.
 * @returns A string with the encrypted data encoded in Base64.
 */
export async function encryptData(
  data: Record<string, unknown>,
  key: string
): Promise<string> {
  try {
    // Step 1: Create a random initialization vector that will be used to encrypt the data
    const iv = _generateInitializationVector();

    // Step 2: Encrypt the data using AES-GCM algorithm
    const buffer = await crypto.subtle.encrypt(
      _getAesGcmIdentifier(iv),
      await _generate256BitKeyFromStringKey(key),
      _encodeJSONDataToArrayBuffer(data),
    );

    // Step 3: Encode the encrypted data to Base64
    return _UInt8ArrayToBase64(new Uint8Array([...iv, ...new Uint8Array(buffer)]));
  } catch (error) {
    throw new UnableToEncryptDataError(error.message);
  }
}

/**
 * Decrypts a string encrypted with the `encryptData` function.
 * @param encryptedData A string with the encrypted data encoded in Base64.
 * @param key The key used to encrypt the data.
 * @throws An error if is not possible to decrypt the data.
 * @returns A JSON object with the decrypted data.
 */
export async function decryptData<Data extends Record<string, unknown>>(
  encryptedData: string,
  key: string
): Promise<Data> {
  try {
    // Step 1: Decode the encrypted data from Base64 to a UInt8Array
    const combinedArray = _base64ToUInt8Array(encryptedData);

    // Step 2: Get the initialization vector from the combined array
    const iv = _getInitializationVectorFromCombinedArray(combinedArray);

    // Step 3: Decrypt the data using AES-GCM algorithm
    const decryptedDataBuffer = await crypto.subtle.decrypt(
      _getAesGcmIdentifier(iv),
      await _generate256BitKeyFromStringKey(key),
      _getEncryptedDataFromCombinedArray(combinedArray)
    );

    // Step 4: Decode the decrypted data from an ArrayBuffer to a JSON object
    return _decodeArrayBufferToJSONData(decryptedDataBuffer) as Data;
  } catch (error) {
    throw new UnableToDecryptDataError(error.message);
  }
}

// Internal Helpers ------------------------------------------------------------

// Encryption Helpers -----

async function _generate256BitKeyFromStringKey(input: string): Promise<CryptoKey> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return crypto.subtle.importKey('raw', buffer, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

function _getAesGcmIdentifier(iv: Uint8Array): AesGcmParams {
  return { name: 'AES-GCM', iv };
}

// Converters -----

function _UInt8ArrayToBase64(array: Uint8Array): string {
  return btoa(String.fromCharCode(...array));
}

function _base64ToUInt8Array(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

// Initialization Vector -----

function _generateInitializationVector(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16));
}

// Encoding and Decoding -----

function _encodeJSONDataToArrayBuffer(data: Record<string, unknown>): ArrayBuffer {
  return new TextEncoder().encode(JSON.stringify(data)).buffer;
}

function _decodeArrayBufferToJSONData(buffer: ArrayBuffer): Record<string, unknown> {
  return JSON.parse(new TextDecoder().decode(buffer));
}

// Combined Array Decomposition -----

function _getInitializationVectorFromCombinedArray(combinedArray: Uint8Array): Uint8Array {
  return combinedArray.slice(0, 16);
}

function _getEncryptedDataFromCombinedArray(combinedArray: Uint8Array): Uint8Array {
  return combinedArray.slice(16);
}

// Errors ----------------------------------------------------------------------

class UnableToEncryptDataError extends Error {
  constructor(reason: string) {
    super(`Unable to encrypt data: ${reason}`);
  }
}

class UnableToDecryptDataError extends Error {
  constructor(reason: string) {
    super(`Unable to decrypt data: ${reason}`);
  }
}