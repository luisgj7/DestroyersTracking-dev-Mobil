import { ToastrService } from './../../../common/providers/native/toastr.service';
import { MapService } from './../../../common/providers/data/map.service';
import { IdentityService } from './../../../core/identity.service';
import { Constants } from './../../../core/constants.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { ITracking } from './../../../common/interfaces/common.interfaces';
import { CameraService } from './../../../common/providers/native/camera.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-start-service',
	templateUrl: 'start-service.html'
})
export class StartServicePage {

	tracking: ITracking = {};
	DEFAULT_IMG = './assets/images/gallery.png';
	private _loader: Loading;
	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _cameraSrv: CameraService,
		private _trackginSrv: TrackingService,
		private _loadingCtrl: LoadingController,
		private _identitySrv: IdentityService,
		private _mapSrv: MapService,
		private _toastrSrv: ToastrService
	) {
		this.tracking = this._navParams.get('tracking') || {};
	}

	takePicture() {
		this._cameraSrv.takePhoto()
			.then(photo => {
				this.tracking.picturePickUp = photo;
				console.log('photo', photo);
			});
	}

	start() {
		if (this.tracking.picturePickUp) {
			this._loader = this._loadingCtrl.create({ content: "Actualizando Data ..." });
			this._loader.present();
			this._mapSrv.getPolyline(this.tracking.pickup.coords, this.tracking.drop.coords)
				.then(coords => {
					this._identitySrv.startInit(coords);
				});
			this._trackginSrv.save({ _id: this.tracking._id, status: Constants.trackginStatus.PICKUP })
				.subscribe(tracking => {
					this._loader.dismiss();
					this._identitySrv.tracking = tracking;
					this._navCtrl.setRoot('TransitServicePage', { tracking });
				});
		}else{
			this._toastrSrv.show('Debe serleccionar una imagen de referencia.');
		}
	}
}
