import { CallNumber } from '@ionic-native/call-number';
import { Constants } from './../../../core/constants.service';
import { TrackingAction } from './../../../socket/tracking.socket';
import { ITracking } from './../../../common/interfaces/common.interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
declare var window;

@IonicPage()
@Component({
	selector: 'page-pickup',
	templateUrl: 'pickup.html'
})
export class PickUpPage {

	tracking: ITracking = {};
	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _menuCtrl: MenuController,
		private _callNumber: CallNumber
	) {
		this._menuCtrl.enable(false);
		this.tracking = this._navParams.get('tracking') || {};
	}

	ngOnInit() {
		TrackingAction.subscriber
			.subscribe(payload => {
				if (payload.type === Constants.pushTypes.PICKUP_TRACKING &&
					payload.tracking.status === Constants.trackginStatus.PICKUP)
					this.next();
			});
	}

	next() {
		this._navCtrl.setRoot('PreTrackingPage', { tracking: this.tracking });
	}

	callTo(): void {
		this._callNumber.callNumber(this.tracking.agent.phone || '999999999', true)
			.then(() => console.log('Launched dialer!'))
			.catch(() => console.log('Error launching dialer'));
	}
}
