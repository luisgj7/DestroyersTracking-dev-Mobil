import { Constants } from './../../../core/constants.service';
import { TrackingAction } from './../../../socket/tracking.socket';
import { IdentityService } from './../../../core/identity.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-finding',
	templateUrl: 'finding.html'
})
export class FindingPage {

	isCancel: boolean;
	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _menuCtrl: MenuController,
		private _identitySrv: IdentityService
	) {
		this._menuCtrl.enable(false);
	}

	ngOnInit() {
		this.isCancel = false;
		TrackingAction.subscriber
			.subscribe(payload => {
				if (payload.type === Constants.pushTypes.ACCEPTED_TRACKING && !this.isCancel)
					this._next(payload.tracking);
			});
		setTimeout(() => {
			this._denyPage();
		}, 7000);
	}
	private _denyPage() {
		let tracking = this._navParams.get('tracking');
		if (!this.isCancel) this._navCtrl.setRoot('DenyPage', { tracking });
	}
	private _next(tracking) {
		this._navCtrl.setRoot('OnGoingPage', { tracking });
	}

	ionViewDidLeave() {
		this.isCancel = true;
	}

	cancel() {
		this._navCtrl.setRoot('HomePage');
	}
}
