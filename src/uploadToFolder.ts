import { google } from 'googleapis';
import { driveAuth } from './driveAuth';
import * as fs from 'fs';
import path from 'path';

const folderId = 'id da pasta';
const filePath = path.join(process.cwd(), 'arquivoDeTeste.pdf');

export const createFile = async (): Promise<any> => {
  const auth = await driveAuth.authorize();
  const drive = google.drive({ version: 'v3', auth });
  
  const fileMetadata = {
    name: 'teste.pdf',
    parents: [folderId],
  };

  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(filePath),
  };

  try {
    const file = await drive.files.create({
      requestBody: fileMetadata,
      supportsAllDrives: true,
      media,
      fields: 'id',
    });
    console.log('file', file.data.id);
  } catch (err) {
    console.error('erro', err);
  }
}
