import { OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
export declare class FirebaseAdmin implements OnApplicationBootstrap {
    private static app;
    onApplicationBootstrap(): Promise<void>;
    getApp(): admin.app.App;
}
