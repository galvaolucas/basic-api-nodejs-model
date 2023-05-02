// import fs from 'fs/promises';
// import { google } from 'googleapis';
// import { GoogleSpreadsheet } from 'google-spreadsheet';
// import Excel from 'exceljs';

// interface IClass {
//   listFiles: (authClient: any) => Promise<void>; 
// }

// class DriveFiles implements IClass {
  
// async listFiles(authClient: any): Promise<void> {
//   const drive = google.drive({version: 'v3', auth: authClient});

//   const res = await drive.files.list({
//     q: "name contains 'Planilha de Nomes de Produtos'",
//     corpora: 'drive',
//     driveId: '0AJupbcViZtceUk9PVA',
//     supportsAllDrives: true,
//     includeItemsFromAllDrives: true,
//     includeTeamDriveItems: true,
//     pageSize: 100,
//     fields: 'nextPageToken, files(id, name, modifiedTime, mimeType, webViewLink)',
//   });
  
//   const files = res.data.files;
//   if (files.length === 0) {
//     console.log('No files found.');
//     return;
//   }

//   console.log('Files:');
//   files.map((file: any) => {
//     console.log(
//       `
//        Nome: ${file.name} \n 
//        Id: ${file.id} \n
//        ModifiedTime: ${file.modifiedTime} \n
//        mimeType: ${file.mimeType} \n
//        webViewLink: ${file.webViewLink} \n
//       `);
//   });

//   const bufferFile = await drive.files.get({
//     supportsAllDrives: true,
//     fileId: files[0].id,
//     alt: 'media',
//   },
//   { responseType: "arraybuffer" });

//   const readBufferFile = await drive.files.get({
//     supportsAllDrives: true,
//     fileId: files[0].id,
//     alt: 'media',
//   },
//   { responseType: "stream" });

//   this.getWorkSheetData(authClient, bufferFile.data);
  
//   this.readExcel(authClient, readBufferFile.data);

// }

// async accessSpreadsheet (fileId: string) {
//   const content = await fs.readFile(this.client_secret);
  
//   const keys = JSON.parse(String(content));

//   const doc = new GoogleSpreadsheet(fileId);
  
//   await doc.useServiceAccountAuth(keys);

// }


// async getWorkSheetData (authClient: any, buffer: Buffer | any) {
  
//   const wb = new Excel.Workbook();

//   const file = await wb.xlsx.load(buffer);

// }

// async readExcel (authClient: any, buffer: Buffer | any) {
  
//   const wb = new Excel.Workbook();

//   const read = await wb.xlsx.read(buffer);

//   //modificando o array, é possível acessar cada uma das worksheets

//   //pelos métodos, também é possível adicionar linhas, colunas, escrever na planilha, etc..

//   console.log('dados do arquivo', read.worksheets[1].getSheetValues());

// }

// }


// export const drive = new DriveFiles;