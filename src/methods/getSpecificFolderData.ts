import { drive_v3 } from "googleapis";

export const getSpecificFolderData = async (drive: drive_v3.Drive, folderId: string, sharedDriveId: string): Promise<drive_v3.Schema$FileList> => {
  try {
    const filesToCopyMetadata = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id,name,parents,mimeType)',
      spaces: 'drive',
      includeTeamDriveItems: true,
      teamDriveId: sharedDriveId,
      supportsTeamDrives: true,
      corpora: 'drive',
    });
    return filesToCopyMetadata.data;
  } catch (err) {
    console.error('erro:', err);
  }
}