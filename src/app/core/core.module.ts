import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { ConfigService } from './config.service';
import { IdentityService } from './identity.service';
import { HeadersService } from './headers.service';
import { StorageService } from './storage.service';
import { OneSignalService } from './onesignal.service';

@NgModule({
	imports: [
		IonicStorageModule.forRoot({
			name: '__destroyers-tracking',
			driverOrder: ['indexeddb', 'sqlite', 'websql']
		}),
		HttpModule
	],
	declarations: [
	],
	entryComponents: [
	],
	providers: [
		ConfigService,
		IdentityService,
		HeadersService,
		StorageService,
		OneSignalService
	],
	exports: [
		IonicModule
	]
})
export class CoreModule { }
