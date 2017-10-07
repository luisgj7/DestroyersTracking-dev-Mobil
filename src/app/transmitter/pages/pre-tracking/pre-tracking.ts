import { TrackingAction } from './../../../socket/tracking.socket';
import { ToastrService } from './../../../common/providers/native/toastr.service';
import { Constants } from './../../../core/constants.service';
import { IdentityService } from './../../../core/identity.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

@IonicPage()
@Component({
	selector: 'page-pre-tracking',
	templateUrl: 'pre-tracking.html'
})
export class PreTrackingPage {

	tracking: any = {};

	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _trackginSrv: TrackingService,
		private _loadingCtrl: LoadingController,
		private _identitySrv: IdentityService,
		private _clipboard: Clipboard,
		private _toastrSrv: ToastrService,
		private _menuCtrl: MenuController
	) {
		this._menuCtrl.enable(true);
		this.tracking = this._navParams.get('tracking') || {};
	}

	ngOnInit() {
		TrackingAction.subscriber
		.subscribe(payload => {
			 if (payload.type === Constants.pushTypes.COMPLETED_TRIP) {
				this._navCtrl.setRoot('FinishTrackingPage', { tracking: payload.tracking });
			}
		});
	}

	next() {
		this._navCtrl.setRoot('TrackingPage', { tracking: this.tracking });
	}

	copy() {
		this._clipboard.copy(this.tracking.code)
			.then(() => this._toastrSrv.show('El código fue copiado', 'bottom', 1000));
	}

}
