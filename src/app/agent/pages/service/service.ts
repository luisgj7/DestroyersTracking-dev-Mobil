import { IdentityService } from './../../../core/identity.service';
import { Constants } from './../../../core/constants.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { ITracking } from './../../../common/interfaces/common.interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Loading, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-service',
	templateUrl: 'service.html'
})
export class ServicePage {

	tracking: ITracking = {};
	private _loader: Loading;
	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _trackginSrv: TrackingService,
		private _loadingCtrl: LoadingController,
		private _identitySrv: IdentityService
	) {
		this.tracking = this._navParams.get('tracking') || {};
	}

	next() {
		this._loader = this._loadingCtrl.create({ content: "Actualizando Data ..." });
		this._loader.present();
		this._trackginSrv.save({ _id: this.tracking._id, status: Constants.trackginStatus.ARRIVED })
			.subscribe(tracking => {
				this._loader.dismiss();
				this._identitySrv.tracking = tracking;
				this._navCtrl.setRoot('StartServicePage', { tracking });
			});
	}
}
