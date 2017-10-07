import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

import { PlatformMonitorService } from './platform-monitor.service';

@Injectable()
export class ToastrService {

	constructor(
		private _platformMtrSrv: PlatformMonitorService,
		private _toastCtrl: ToastController,
		private _toast: Toast
	) { }

	show(message: string, position: string = 'bottom', duration: number = 2000): void {
		if (this._platformMtrSrv.isDevice()) {
			this._toast.show(message, `${duration}`, position)
				.subscribe(toast => { });
		} else {
			this._toastCtrl.create({ message, duration }).present();
		}
	}

}
