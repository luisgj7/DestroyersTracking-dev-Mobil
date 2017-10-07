import { Constants } from './../../../core/constants.service';
import { IdentityService } from './../../../core/identity.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { ITracking } from './../../../common/interfaces/common.interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading, AlertController, Alert } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-pre-service',
	templateUrl: 'pre-service.html'
})
export class PreServicePage {

	tracking: ITracking = {};

	private _loader: Loading;
	private _alert: Alert;

	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _trackginSrv: TrackingService,
		private _identitySrv: IdentityService,
		private _loadingCtrl: LoadingController,
		private _alertCtrl: AlertController
	) {
		this.tracking = this._navParams.get('tracking') || {};
	}

	close() {
		this._navCtrl.setRoot('FindingRequestPage');
	}

	accept() {
		this._loader = this._loadingCtrl.create({ content: "Actualizando Data ..." });
		this._loader.present();
		this._trackginSrv.getById(this.tracking._id).toPromise()
			.then(tracking => {
				if (tracking.status === Constants.trackginStatus.PENDING) {
					let agent = {
						fullName: this._identitySrv.user.fullName,
						phone: this._identitySrv.user.phone,
						email: this._identitySrv.user.email
					};
					let car = this._identitySrv.user.car;
					this._trackginSrv.save({ _id: tracking._id, status: Constants.trackginStatus.ONGOING, agent, car })
						.subscribe(tracking => {
							this._loader.dismiss();
							this._identitySrv.tracking = tracking
							this._navCtrl.setRoot('ServicePage', { tracking });
						});
				} else {
					this._loader.dismiss();
					this._alert = this._alertCtrl.create({
						title: 'Alert',
						subTitle: 'Este servicio ya fue aceptado por otro agente.',
						buttons: ['Ok']
					});
					this._alert.onDidDismiss(() => {
						this.close();
					});
					this._alert.present();
				}
			}).catch(() => {
				this._loader.dismiss();
			});
	}
}
