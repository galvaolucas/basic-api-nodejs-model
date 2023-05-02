import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { GoogleAuth, JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { BaseExternalAccountClient, Credentials, JWT, OAuth2Client } from 'google-auth-library';

interface IClient extends Credentials {
  credentials: {
    access_token: string;
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
}

class AuthDrive implements IClass {
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

async loadSavedCredentialsIfExist(): Promise<any> {
  try {
    const content = await fs.readFile(this.token_path);
    const credentials = JSON.parse(String(content));
    return google.auth.fromJSON({...credentials, refresh_token: credentials.access_token});
  } catch (err) {
    console.log('err', err);
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
    access_token: client.credentials.access_token,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(this.token_path, payload);
}

async authorize() {
  let client = await this.loadSavedCredentialsIfExist();
  if (client) {
    console.log('entro')
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
}


export const driveAuth = new AuthDrive;