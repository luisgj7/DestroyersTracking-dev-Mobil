import { GeolocationService } from './../../../common/providers/native/geolocation.service';
import { Constants } from './../../../core/constants.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { IdentityService } from './../../../core/identity.service';
import { TrackingAction } from './../../../socket/tracking.socket';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-finding-request',
	templateUrl: 'finding-request.html'
})
export class FindingRequestPage {

	isCancel: boolean;
	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _menuCtrl: MenuController,
		private _identitySrv: IdentityService,
		private _trackingSrv: TrackingService
	) {
		this._menuCtrl.enable(false);
	}

	ngOnInit() {
		this.isCancel = false;
		if (!this._identitySrv.tracking) {
			TrackingAction.subscriber
				.subscribe(payload => {
					if (payload.type === Constants.pushTypes.NEW_TRACKING && !this.isCancel)
						this._next(payload.tracking);
				});
			this._trackingSrv.ubicacionSrv(GeolocationService.coords, this._identitySrv.user.email);
			// this._trackingSrv.query({ last: true })
			// 	.subscribe(trackings => {
			// 		console.log(trackings);
			// 		if (trackings.length) this._next(trackings[0]);
			// 	})
		}
	}

	private _next(tracking) {
		this._navCtrl.setRoot('PreServicePage', { tracking });
	}

	ionViewDidLeave() {
		this.isCancel = true;
	}

	cancel() {
		this._navCtrl.setRoot('HomePage');
	}
}
