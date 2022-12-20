import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { Credentials } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Excel from 'exceljs';

interface IClient extends Credentials {
  credentials: {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    refresh_token: string;
    client_secret: string;
  }
}

interface IClass {
  scopes: string[];
  token_path: string;
  credentials: string;
  client_secret: string;
  authorize: () => Promise<any>;
  listFiles: (authClient: any) => Promise<void>; 
}

class DriveFiles implements IClass {
  scopes: string[];
  token_path: string;
  credentials: string;
  client_secret: string;

  constructor() {
    const SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/spreadsheets.readonly'];
    const TOKEN_PATH = path.join(process.cwd(), 'token.json');
    const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
    const CLIENT_SECRET = path.join(process.cwd(), 'client_secret.json');

    this.scopes = SCOPES;
    this.token_path = TOKEN_PATH;
    this.credentials = CREDENTIALS_PATH;
    this.client_secret = CLIENT_SECRET;
  }

async loadSavedCredentialsIfExist(): Promise<JSONClient> {
  try {
    const content = await fs.readFile(this.token_path);
    const credentials = JSON.parse(String(content));
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async saveCredentials(client: IClient): Promise<void> {
  const content = await fs.readFile(this.credentials);
  const keys = JSON.parse(String(content));
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(this.token_path, payload);
}

async authorize() {
  let client: any = await this.loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  
  client = await authenticate({
    scopes: this.scopes,
    keyfilePath: this.credentials,
  })
  
  if (client.credentials) {
    await this.saveCredentials(client);
  }

  return client;
}

async listFiles(authClient: any): Promise<void> {
  const drive = google.drive({version: 'v3', auth: authClient});

  const res = await drive.files.list({
    q: "name contains 'Planilha de Nomes de Produtos'",
    corpora: 'drive',
    driveId: '0AJupbcViZtceUk9PVA',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    includeTeamDriveItems: true,
    pageSize: 100,
    fields: 'nextPageToken, files(id, name, modifiedTime, mimeType, webViewLink)',
  });
  
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(
      `
       Nome: ${file.name} \n 
       Id: ${file.id} \n
       ModifiedTime: ${file.modifiedTime} \n
       mimeType: ${file.mimeType} \n
       webViewLink: ${file.webViewLink} \n
      `);
  });

  const bufferFile = await drive.files.get({
    supportsAllDrives: true,
    fileId: files[0].id,
    alt: 'media',
  },
  { responseType: "arraybuffer" });

  const readBufferFile = await drive.files.get({
    supportsAllDrives: true,
    fileId: files[0].id,
    alt: 'media',
  },
  { responseType: "stream" });

  this.getWorkSheetData(authClient, bufferFile.data);
  
  this.readExcel(authClient, readBufferFile.data);

}

async accessSpreadsheet (fileId: string) {
  const content = await fs.readFile(this.client_secret);
  
  const keys = JSON.parse(String(content));

  const doc = new GoogleSpreadsheet(fileId);
  
  await doc.useServiceAccountAuth(keys);

}


async getWorkSheetData (authClient: any, buffer: Buffer | any) {
  
  const wb = new Excel.Workbook();

  const file = await wb.xlsx.load(buffer);

}

async readExcel (authClient: any, buffer: Buffer | any) {
  
  const wb = new Excel.Workbook();

  const read = await wb.xlsx.read(buffer);

  //modificando o array, é possível acessar cada uma das worksheets

  //pelos métodos, também é possível adicionar linhas, colunas, escrever na planilha, etc..

  console.log('dados do arquivo', read.worksheets[1].getSheetValues());

}

}


export const drive = new DriveFiles;