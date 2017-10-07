import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { PlatformMonitorService } from './../common/providers/native/platform-monitor.service';
import { Constants } from './constants.service';

@Injectable()
export class OneSignalService {

	constructor(
		private _oneSignal: OneSignal,
		private _platformMtrSrv: PlatformMonitorService
	) { }

	init(cbProcess?: any): void {
		if (this._platformMtrSrv.isDevice()) {
			if (this._platformMtrSrv.isAndroid) this._oneSignal.startInit(Constants.oneSignalAppId, Constants.googleProjectNumber);
			else this._oneSignal.startInit(Constants.oneSignalAppId);

			this.setSubscription(false);

			this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.Notification);

			this._oneSignal.handleNotificationOpened().subscribe(result => {
				cbProcess(result.notification.payload.additionalData);
			});

			this._oneSignal.endInit();
		}
	}

	setSubscription(status: boolean) {
		if (this._platformMtrSrv.isDevice()) this._oneSignal.setSubscription(status);
	}

	getIds(): Promise<any> {
		if (this._platformMtrSrv.isDevice()) return this._oneSignal.getIds();
		return Promise.resolve();
	}
}

// OneSignal.handleNotificationReceived().subscribe(result => {
//     // do something when notification is received
//     console.log('Received Push:', result);
// });

