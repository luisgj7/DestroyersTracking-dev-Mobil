import { Constants } from './../../../core/constants.service';
import { IdentityService } from './../../../core/identity.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-transit-service',
	templateUrl: 'transit-service.html'
})
export class TransitServicePage {

	tracking: any = {};
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

	finish() {
		this._loader = this._loadingCtrl.create({ content: "Actualizando Data ..." });
		this._loader.present();
		this._identitySrv.tracking = undefined;
		this._trackginSrv.save({ _id: this.tracking._id, status: Constants.trackginStatus.ARRIVED_DROP })
			.subscribe(tracking => {
				this._navCtrl.setRoot('FinishServicePage', { tracking: this.tracking });
				this._loader.dismiss();
			});
	}

}
