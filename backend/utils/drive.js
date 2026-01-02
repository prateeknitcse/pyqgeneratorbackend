const { google } = require("googleapis");
const fs = require("fs");

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/drive"]
});

const drive = google.drive({ version: "v3", auth });

async function uploadToDrive(file) {
  // Upload file
  const response = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: [process.env.DRIVE_FOLDER_ID]
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path)
    }
  });

  const fileId = response.data.id;

  // Make file public
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone"
    }
  });

  // Remove local file (optional but recommended)
  fs.unlinkSync(file.path);

  // Return preview URL
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

module.exports = uploadToDrive;
