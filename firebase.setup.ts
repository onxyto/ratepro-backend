import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  private static app: admin.app.App = null;

  async onApplicationBootstrap() {
    if (!FirebaseAdmin.app) {
      const firebaseServiceAccountFile = await readFile('./firebaseServiceAccountKey.json', 'utf8');
      const serviceAccount = JSON.parse(firebaseServiceAccountFile);
      FirebaseAdmin.app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }

  getApp() {
    return FirebaseAdmin.app;
  }
}
