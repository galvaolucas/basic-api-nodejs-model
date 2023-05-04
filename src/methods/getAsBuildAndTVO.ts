import { drive_v3, google } from "googleapis";
import { driveAuth } from "../auth/driveAuth";

export const getAsBuiltAndTVO = async (sharedDriveId: string): Promise<any> => {
  try {
    const auth = await driveAuth.authorize();
    const drive = google.drive({ version: 'v3', auth });
    const tvoFolder = await drive.files.list({
      q: `mimeType=\'application/vnd.google-apps.folder\' and name contains 'TVO'`,
      fields: 'nextPageToken, files(id, name, parents)',
      spaces: 'drive',
      includeTeamDriveItems: true,
      teamDriveId: sharedDriveId,
      supportsTeamDrives: true,
      corpora: 'drive',
    });
    const asBuiltFolder = await drive.files.list({
      q: `mimeType=\'application/vnd.google-apps.folder\' and name contains 'As-Built'`,
      fields: 'nextPageToken, files(id, name, parents)',
      spaces: 'drive',
      includeTeamDriveItems: true,
      teamDriveId: sharedDriveId,
      supportsTeamDrives: true,
      corpora: 'drive',
    });
    return { tvoFolderId: tvoFolder.data.files[0].id, asBuiltFolderId: asBuiltFolder.data.files[0].id };
  } catch (err) {
    console.error('erro:', err);
  }
}