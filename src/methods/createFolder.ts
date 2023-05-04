import { drive_v3 } from "googleapis";

export const createFolder = async (drive: drive_v3.Drive, folderParents: string[], mimeType: string, nomeDaPasta: string): Promise<drive_v3.Schema$File> => {
  try {
    const { data: newFolder } = await drive.files.create({
      requestBody: {
        name: nomeDaPasta,
        parents: folderParents,
        mimeType: mimeType
      },
      supportsAllDrives: true,
      fields: 'id,name,parents,mimeType'
    });
    return newFolder;
  } catch (err) {
    console.error('erro:', err);
  }
}