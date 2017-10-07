import { Constants } from './../../../core/constants.service';
import { TrackingAction } from './../../../socket/tracking.socket';
import { MapService } from './../../../common/providers/data/map.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { ICoords, ITracking } from './../../../common/interfaces/common.interfaces';
import { Keyboard } from '@ionic-native/keyboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, MenuController, LoadingController, Loading } from 'ionic-angular';
import { GoogleMapService } from './../../../common/providers/native/google-map.service';

@IonicPage()
@Component({
	selector: 'page-tracking',
	templateUrl: 'tracking.html'
})
export class TrackingPage {

	payload: any = {};
	isActive: boolean;
	tracking: ITracking = {};
	private _loader: Loading;
	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _googleMapSrv: GoogleMapService,
		private _alertCtrl: AlertController,
		private _keyboardCtrl: Keyboard,
		private _events: Events,
		private _trackingSrv: TrackingService,
		private _mapSrv: MapService,
		private _menuCtrl: MenuController,
		private _loadingCtrl: LoadingController
	) {
		this._menuCtrl.enable(true);
		this.payload = this._navParams.data || {};
	}

	ngOnInit() {
		this._events.subscribe('menu:opened', () => {
			this._googleMapSrv.setClickable(false);
		});
		this._events.subscribe('menu:closed', () => {
			this._googleMapSrv.setClickable(true);
		});

		this.payload.code = (this.payload.tracking) ? this.payload.tracking.code : this.payload.code;
		TrackingAction.subscriber
			.subscribe(payload => {
				if (payload.type === 'update-position-tracking'
					&& this.payload.code
					&& payload.tracking
					&& payload.tracking.code.toLowerCase() === this.payload.code.toLowerCase()) {
					this._googleMapSrv.setMyMarker(payload.tracking.position);
				}
			});
	}

	ionViewWillEnter() {
		if (this.payload.code || (this.payload.tracking && this.payload.tracking._id)) {
			this._googleMapSrv.initMap()
				.then(() => this._addMarkers())
		}
		else {
			this._getCode();
		}
	}

	ionViewDidLeave() {
		this._googleMapSrv.showMyMarker(false);
		this._googleMapSrv.clearRoute();
	}

	details() {
		this._navCtrl.setRoot('PreTrackingPage', { tracking: this.tracking });
	}

	private _completed(tracking) {
		this._navCtrl.setRoot('FinishTrackingPage', { tracking });
	}

	private _addMarkers() {
		this._loader = this._loadingCtrl.create({ content: "Actualizando Data ..." });
		this._loader.present();
		this._getTracking()
			.then(tracking => {
				this._loader.dismiss();
				if (tracking._id && tracking.status === Constants.trackginStatus.COMPLETED) {
					this._googleMapSrv.setClickable(false);
					let alert = this._alertCtrl.create({
						title: 'Servicio Completado',
						subTitle: 'El servicio ya fue concluido, no se puede dar seguimiento.',
						buttons: ['Ok']
					});
					alert.onDidDismiss(() => {
						this._completed(tracking);
					});
					alert.present();
				} else if (tracking._id) {
					this._googleMapSrv.showMyMarker(true);
					this.isActive = true;
					this.tracking = tracking;
					let points: ICoords[] = [tracking.pickup.coords, tracking.drop.coords];
					this._googleMapSrv.setMarkersRoute(points);
					this._mapSrv.getPolyline(tracking.pickup.coords, tracking.drop.coords)
						.then(polyline => {
							this._googleMapSrv.addPolyLine(polyline, true);
						});
				} else {
					this.isActive = false;
					this._getCode();
				}
			});
	}

	private _getTracking(): Promise<ITracking> {
		if (this.payload.tracking && this.payload.tracking._id) return new Promise(resolve => resolve(this.payload.tracking));
		return this._trackingSrv.getById(this.payload.code).toPromise();
	}

	private _getCode() {
		let alert = this._alertCtrl.create({
			enableBackdropDismiss: false,
			title: 'Código de Tracking',
			inputs: [
				{
					name: 'code',
					placeholder: 'Ingresa el código',
					id: 'code'
				}
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel'
				},
				{
					text: 'OK'
				}
			]
		});
		alert.onDidDismiss(data => {
			if (data.code) {
				this.payload.code = data.code;
				this.isActive = true;
				this._googleMapSrv.initMap()
					.then(() => this._addMarkers())
			} else {
				this._navCtrl.setRoot('HomePage');
			}
		})
		alert.present().then(() => this._openKeyBoard());
	}

	private _openKeyBoard() {
		document.getElementById('code').focus();
		this._keyboardCtrl.show();
	}
}
