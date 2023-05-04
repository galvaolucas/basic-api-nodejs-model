import { drive_v3 } from "googleapis";

export const searchFolder = async (drive: drive_v3.Drive, sharedDriveId: string, codigoDoEmpreendimento: string): Promise<drive_v3.Schema$FileList> => {
  try {
    const res = await drive.files.list({
      q: `mimeType=\'application/vnd.google-apps.folder\' and name contains '${codigoDoEmpreendimento}'`,
      fields: 'nextPageToken, files(id, name, parents)',
      spaces: 'drive',
      includeTeamDriveItems: true,
      teamDriveId: sharedDriveId,
      supportsTeamDrives: true,
      corpora: 'drive',
    });
    return res.data;
  } catch (err) {
    console.error('erro:', err);
  }
}