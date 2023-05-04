import { google } from 'googleapis';
import { driveAuth } from '../auth/driveAuth';
import * as fs from 'fs';
import path from 'path';
import { searchFolder } from './searchFolder';
import { createFolder } from './createFolder';
import { duplicateContentInTheNewFolder } from './duplicateContent';
import { getSpecificFolderData } from './getSpecificFolderData';

const folderId = '1c5SI8P7MITdq46GXRAAEhHJn3xqDioN0';
const filePath = path.join(process.cwd(), 'teste.pdf');

export const uploadToFolder = async (): Promise<any> => {
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
    const sharedDriveId = process.env.TEAM_DRIVE_ID;
    const originalFolder = await searchFolder(drive, sharedDriveId, '0000');
    const originalFolderData = await getSpecificFolderData(drive, originalFolder.files[0].id, sharedDriveId);
    const inside = await getSpecificFolderData(drive, originalFolderData.files[0].id, sharedDriveId);
    if (originalFolderData) {
      // const newFolder = await createFolder(drive, originalFolder.files[0].parents, originalFolderData.files[0].mimeType, 'NomeDoNovoEmpreeendimento');
      // const duplicateData = await duplicateContentInTheNewFolder(drive, originalFolderData, newFolder.id);
    }
    // const file = await drive.files.create({
    //   requestBody: fileMetadata,
    //   supportsAllDrives: true,
    //   media,
    //   fields: 'id',
    // });
    // console.log('file', file.data.id);
  } catch (err) {
    console.error('erro', err);
  }
}

