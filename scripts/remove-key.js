import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get command-line arguments
// eslint-disable-next-line no-undef
const args = process.argv.slice(2);
const filePath = path.resolve(__dirname, args[0]);
const keyPath = args[1];

function removeNestedKey(obj, keyPath) {
  const keys = keyPath.split('.');

  // Traverse the keys to reach the desired location
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    // Handle array indices
    if (key.endsWith(']')) {
      const [arrayKey, index] = key.slice(0, -1).split('[');
      if (!obj[arrayKey] || !obj[arrayKey][Number(index)]) {
        return false; // Path not found
      }
      obj = obj[arrayKey][Number(index)];
    } else {
      if (!obj[key]) {
        return false; // Path not found
      }
      obj = obj[key];
    }
  }

  // Remove the final key
  const finalKey = keys[keys.length - 1];
  if (finalKey.endsWith(']')) {
    const [arrayKey, index] = finalKey.slice(0, -1).split('[');
    if (obj[arrayKey] && obj[arrayKey][Number(index)]) {
      delete obj[arrayKey][Number(index)];
      return true;
    }
  } else {
    if (finalKey in obj) {
      delete obj[finalKey];
      return true;
    }
  }

  return false; // Key not found
}

async function removeKeyFromJson() {
  try {
    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf8');

    // Parse the JSON data
    let jsonData = JSON.parse(data);

    // Remove the nested key
    const success = removeNestedKey(jsonData, keyPath);

    if (!success) {
      console.log(`Key path "${keyPath}" not found.`);
      return;
    }

    // Write the updated JSON back to the file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

    console.log(`Key path "${keyPath}" has been removed successfully.`);
  } catch (err) {
    console.error('Error:', err);
  }
}

removeKeyFromJson();
