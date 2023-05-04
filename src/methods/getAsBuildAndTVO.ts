import { google } from "googleapis";
import { driveAuth } from "../auth/driveAuth";

export const getAsBuiltAndTVO = async (sharedDriveId: string, codigoDoEmpreendimento: string): Promise<{tvoFolderId: string, asBuiltFolderId: string}> => {
  try {
    const auth = await driveAuth.authorize();
    const drive = google.drive({ version: 'v3', auth });
    const parentFolder = await drive.files.list({
      q: `mimeType=\'application/vnd.google-apps.folder\' and name contains '${codigoDoEmpreendimento}' and trashed = false`,
      fields: 'nextPageToken, files(id, name, parents)',
      spaces: 'drive',
      includeTeamDriveItems: true,
      teamDriveId: sharedDriveId,
      supportsTeamDrives: true,
      corpora: 'drive',
    });
    const listFolders = await drive.files.list({
      q: `mimeType=\'application/vnd.google-apps.folder\' and '${parentFolder.data.files[0].id}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, parents)',
      spaces: 'drive',
      includeTeamDriveItems: true,
      teamDriveId: sharedDriveId,
      supportsTeamDrives: true,
      corpora: 'drive',
    });
    const tvoAndAsBuiltParentFolder = listFolders.data.files.filter((folder) => folder.name.includes('02 - Recebidos da Loteadora'));
    const tvoAndAsBuiltFolder = await drive.files.list({
      q: `mimeType=\'application/vnd.google-apps.folder\' and '${tvoAndAsBuiltParentFolder[0].id}' in parents`,
      fields: 'nextPageToken, files(id, name, parents)',
      spaces: 'drive',
      includeTeamDriveItems: true,
      teamDriveId: sharedDriveId,
      supportsTeamDrives: true,
      corpora: 'drive',
    });
    const tvoFolderId = tvoAndAsBuiltFolder.data.files.filter((folder) => folder.name.includes('TVO'));
    const asBuiltFolderId = tvoAndAsBuiltFolder.data.files.filter((folder) => folder.name.includes('As-Built'));
    return { tvoFolderId: tvoFolderId[0].id, asBuiltFolderId: asBuiltFolderId[0].id };
  } catch (err) {
    console.error('erro:', err);
  }
}