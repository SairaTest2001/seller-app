// global-setup.js
import fs from 'fs';
import path from 'path';

const clearResultsFolder = () => {
  const resultsDir = path.join(__dirname, 'test-results');
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
    console.log('Cleared the test-results folder.');
  }
};

export default async function globalSetup() {
  clearResultsFolder();  // Clears the test-results folder before the tests run
}
