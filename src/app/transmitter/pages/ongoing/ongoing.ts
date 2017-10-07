import { Constants } from './../../../core/constants.service';
import { TrackingAction } from './../../../socket/tracking.socket';
import { ITracking } from './../../../common/interfaces/common.interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-ongoing',
	templateUrl: 'ongoing.html'
})
export class OnGoingPage {

	tracking: ITracking = {};
	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _menuCtrl: MenuController
	) {
		this._menuCtrl.enable(false);
		this.tracking = this._navParams.get('tracking') || {};
	}

	ngOnInit() {
		TrackingAction.subscriber
			.subscribe(payload => {
				if (payload.type === Constants.pushTypes.ARRIVED_AGENT &&
					payload.tracking.status === Constants.trackginStatus.ARRIVED)
					this.next();
			});
	}

	ionViewDidLeave() {
		this._menuCtrl.enable(true);
	}

	next(): void {
		this._navCtrl.setRoot('PickUpPage', { tracking: this.tracking });
	}
}
