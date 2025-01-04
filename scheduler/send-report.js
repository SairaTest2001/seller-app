import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';  // New addition for zipping the directories
import { authenticate, uploadFile } from './googleDrive.js';

// Get the directory name for ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Path to Allure report and results folders
const allureReportDir = path.resolve(__dirname, 'E:/Automation/automation-playwright-saira/MSN/reports/allure-report');
const allureResultsDir = path.resolve(__dirname, 'E:/Automation/automation-playwright-saira/MSN/reports/allure-results');
const allureZipPath = path.resolve(__dirname, 'E:/Automation/automation-playwright-saira/MSN/reports/allure-report.zip');

// Zipping both Allure report and results
async function zipAllureResults() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(allureZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', function () {
      console.log(`Allure report ZIP created successfully. Total bytes: ${archive.pointer()}`);
      resolve(allureZipPath);
    });

    archive.on('error', function (err) {
      reject(err);
    });

    // Pipe the archive data to the output file
    archive.pipe(output);

    // Include both the allure-report folder and allure-results folder in the zip
    archive.directory(allureReportDir, 'allure-report');  // Includes report content
    archive.directory(allureResultsDir, 'allure-results');  // Includes test results (screenshots, .json)

    // Finalize the archive (this will create the zip file)
    archive.finalize();
  });
}

async function sendMail(playwrightLink, allureLink) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testsaira2001@gmail.com',  // Your Gmail address
        pass: 'povs prwy qqdf sygs',  // App-specific password
      }
    });

    const mailOptions = {
      from: 'testsaira2001@gmail.com',
      to: 'saira.shaik@adya.ai, manik.arora@adya.ai, rubin.kumar@adya.ai, shayak.mazumder@adya.ai, archana@adya.ai',  // Recipient email
      subject: 'MSN Seller App Automated Test Reports',
      html: `
        <h1>Latest Run Test Report</h1>
        <p>Playwright Report: <a href="${playwrightLink}">View Report</a></p>
        <p>Allure Report: <a href="${allureLink}">View Allure Report</a></p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Upload reports to Google Drive and send email
async function uploadReports() {
  try {
    console.log("Starting report upload...");

    const auth = await authenticate();

    // Use path.resolve to avoid path issues
    const playwrightReportPath = path.resolve(__dirname, 'E:/Automation/automation-playwright-saira/MSN/reports/html-report/index.html');

    console.log("Playwright Report Path:", playwrightReportPath);
    console.log("Allure Report Folder:", allureReportDir);
    console.log("Allure Results Folder:", allureResultsDir);

    if (!fs.existsSync(playwrightReportPath)) {
      console.log('Playwright report not found.');
      return;
    }
    if (!fs.existsSync(allureReportDir) || !fs.existsSync(allureResultsDir)) {
      console.log('Allure report or results folder not found.');
      return;
    }

    // Zip both the Allure report and results folders
    await zipAllureResults();

    // Upload Playwright report
    const playwrightLink = await uploadFile(auth, playwrightReportPath, 'text/html');
    console.log('Playwright Report uploaded! Link:', playwrightLink);

    // Upload Allure ZIP file
    const allureLink = await uploadFile(auth, allureZipPath, 'application/zip');
    console.log('Allure Report uploaded! Link:', allureLink);

    // Send the email with the links
    await sendMail(playwrightLink, allureLink);

  } catch (error) {
    console.error('Error uploading reports:', error);
  }
}

uploadReports();
