import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from './common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Contacts } from '@ionic-native/contacts';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Keyboard } from '@ionic-native/keyboard';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { HeaderColor } from '@ionic-native/header-color';
import { File } from '@ionic-native/file';
import { OneSignal } from '@ionic-native/onesignal';
import { CallNumber } from '@ionic-native/call-number';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Clipboard } from '@ionic-native/clipboard';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MyApp } from './app.component';
import { CoreModule } from './core/core.module';
@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			scrollAssist: false,
			autoFocusAssist: true
		}),
		CoreModule,
		BrowserAnimationsModule,
		CommonModule
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp],
	providers: [
		SplashScreen,
		StatusBar,
		HeaderColor,
		Camera,
		FilePath,
		Keyboard,
		FileTransfer,
		File,
		GoogleMaps,
		Geolocation,
		Contacts,
		Toast,
		OneSignal,
		CallNumber,
		Clipboard,
		LocationAccuracy,
		Diagnostic,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
