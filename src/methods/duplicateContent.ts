import { drive_v3 } from "googleapis";

export const duplicateContentInTheNewFolder = async (drive: drive_v3.Drive, metadata: drive_v3.Schema$FileList, newFolderId: string): Promise<any> => {
  try {
    for (const fileMetadata of metadata.files) {
      await drive.files.create({
        supportsAllDrives: true,
        requestBody: {
          name: fileMetadata.name,
          parents: [newFolderId],
          mimeType: fileMetadata.mimeType
        }
      });
    }
  } catch (err) {
    console.error('erro:', err);
  }
}