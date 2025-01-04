import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Path to your service account credentials JSON file
const CREDENTIALS_PATH = 'E:/Automation/automation-playwright-saira/MSN/credentials.json';

// Authenticate using the service account credentials
export async function authenticate() {
  console.log("Starting authentication...");
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    console.log("Authentication successful!");
    return auth;
  } catch (err) {
    console.error("Authentication failed:", err);
    throw err;
  }
}

// Upload a file to Google Drive
export async function uploadFile(auth, filePath, mimeType) {
  console.log(`Uploading file: ${filePath}`);
  try {
    const drive = google.drive({ version: 'v3', auth });
    const fileMetadata = {
      name: path.basename(filePath), // File name
      parents: ['1LeQN7O2mhIiZnsxAMwjoceyvNLQ-meyS'],  // Folder ID for "MSN-Test-Reports"
    };
    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    // Set the file permissions to be accessible by anyone with the link
    await drive.permissions.create({
      fileId: file.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    console.log(`File uploaded successfully: ${file.data.webViewLink}`);
    return file.data.webViewLink;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}
