import { GeolocationService } from './../../../common/providers/native/geolocation.service';
import { DiagnosticService } from './../../../common/providers/native/diagnostic.service';
import { Component } from '@angular/core';

import { IonicPage, NavController, MenuController, AlertController, LoadingController, Loading } from 'ionic-angular';
@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	loading: Loading;
	constructor(
		private _navCtrl: NavController,
		private _menuCtrl: MenuController,
		private _diagnosticSrv: DiagnosticService,
		private _alertCtrl: AlertController,
		private _geolocationSrv: GeolocationService,
		private _loadingCtrl: LoadingController
	) {
		this.loading = this._loadingCtrl.create({ content: 'Obteniendo su localización.' });
	}

	ionViewWillEnter() {
		this._menuCtrl.enable(true);
	}
	ngOnInit() {
	}

	request() {
		this._diagnosticSrv.isLocationAvailable()
			.then(available => !available ? this._diagnosticSrv.requestLocation() : available)
			.then(available => {
				if (available) {
					if (GeolocationService.coords) this._navCtrl.push('RequestPage');
					else {
						this.loading.present();
						this._geolocationSrv.getPosition()
							.then(() => {
								this.loading.dismiss();
								this._navCtrl.push('RequestPage');
							});
					}
				}
				else {
					let alert = this._alertCtrl.create({
						title: 'Geolocalización',
						subTitle: 'Usted debe tener el GPS activo !',
						buttons: ['OK']
					});
					alert.present();
				}
			});
	}

	findingRequest() {
		this._diagnosticSrv.isLocationAvailable()
			.then(available => !available ? this._diagnosticSrv.requestLocation() : available)
			.then(available => {
				if (available) {
					if (GeolocationService.coords) this._navCtrl.push('FindingRequestPage');
					else {
						this.loading.present();
						this._geolocationSrv.getPosition()
							.then(() => {
								this.loading.dismiss();
								this._navCtrl.push('FindingRequestPage');
							});
					}
				}
				else {
					let alert = this._alertCtrl.create({
						title: 'Geolocalización',
						subTitle: 'Usted debe tener el GPS activo !',
						buttons: ['OK']
					});
					alert.present();
				}
			});
	}
}
