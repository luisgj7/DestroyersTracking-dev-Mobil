import { ToastrService } from './../../../common/providers/native/toastr.service';
import { IdentityService } from './../../../core/identity.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { ContactsService } from './../../../common/providers/native/contacts.service';
import { MapService } from './../../../common/providers/data/map.service';
import { GeolocationService } from './../../../common/providers/native/geolocation.service';
import { ITracking, IPlace, IPerson } from './../../../common/interfaces/common.interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-request',
	templateUrl: 'request.html'
})
export class RequestPage {

	payload: any = {};

	pickUpPlace: IPlace = {};
	dropPlace: IPlace = {};
	receiver: IPerson = {};
	tracking: ITracking = {};
	terminos: boolean;

	mapStatic: string;

	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _modalCtrl: ModalController,
		private _geolocationSrv: GeolocationService,
		private _mapSrv: MapService,
		private _contactSrv: ContactsService,
		private _trackingSrv: TrackingService,
		private _identitySrv: IdentityService,
		private _toastrSrv: ToastrService,
		private _alertCtrl: AlertController,
		private _loadingCtrl: LoadingController
	) {
		this.payload = this._navParams.data || {};
	}

	ngOnInit() {
		switch (this.payload.type) {
			case 'tmp':
				this._loadTmp();
				break;
			default: this._loadDefault();
		}
	}

	close() {
		this._navCtrl.setRoot('HomePage');
	}

	save() {
		if (this._validate()) {
			this.tracking.pickup = this.pickUpPlace;
			this.tracking.drop = this.dropPlace;
			this.tracking.receiver = this.receiver;
			this.tracking.sender = {
				fullName: this._identitySrv.user.fullName,
				phone: this._identitySrv.user.phone,
				email: this._identitySrv.user.email,
				_id: this._identitySrv.user._id
			};
			let loading = this._loadingCtrl.create({ content: 'Salvando data ...' });
			loading.present();
			this._trackingSrv.save(this.tracking)
				.subscribe((tracking: any) => {
					loading.dismiss();
					if (tracking._id) this._navCtrl.setRoot('FindingPage', { tracking });
					else {
						this._alertCtrl.create({
							title: 'Error Nº' + tracking.Codigo,
							subTitle: tracking.Descripcion,
							buttons: ['Ok']
						}).present();
					}
				});
		}
	}

	selectPlace(type: string) {
		let modal = this._modalCtrl.create('AutocompletePage', { coords: GeolocationService.coords });
		modal.onDidDismiss((place: IPlace) => {
			if (place && type === 'pickup') this.pickUpPlace = place;
			else if (place && type === 'drop') {
				place.reference = this.dropPlace.reference;
				this.dropPlace = place;
			}

			// if (this.pickUpPlace.coords && this.dropPlace.coords) this._getRoute();
		});
		modal.present().then(() => {
			let element: any = document.getElementsByClassName('searchbar-input')[0];
			element.focus();
		});
	}

	openContacts() {
		this._contactSrv.pickContact().then(person => this.receiver = person || {});
	}

	private _validate() {
		if (!this.pickUpPlace.coords) this._validateMsg('Seleccionar el origen');
		else if (!this.dropPlace.coords) this._validateMsg('Seleccionar el destino');
		else if (!this.dropPlace.reference) this._validateMsg('Agregar una referencia');
		else if (!this.tracking.description) this._validateMsg('Agregar una descripción');
		else if (!this.receiver.fullName) this._validateMsg('Agregar el destinatario');
		else if (!this.receiver.phone) this._validateMsg('Agregar el número de telf');
		else if (!this.receiver.email) this._validateMsg('Agregar el email del destinatario');
		else if (!this.terminos) this._validateMsg('Debe aceptar los términos y condiciones');
		else return true;
		return false;
	}

	private _validateMsg(msg: string) {
		this._toastrSrv.show(msg);
	}
	private _getRoute() {
		this._mapSrv.getPolyline(this.pickUpPlace.coords, this.dropPlace.coords, 'img')
			.then(img => this.mapStatic = img.url);
	}

	private _loadDefault() {
		// this._geolocationSrv.getPosition()
		this._mapSrv.getPlaceDetails({ coords: GeolocationService.coords })
			.then(place => this.pickUpPlace = place);
	};

	private _loadTmp(): void {
		let tmp: ITracking = this.payload.tracking;
		this.pickUpPlace = tmp.pickup;
		this.tracking.description = tmp.description;
		this.dropPlace = tmp.drop;
		this.receiver = tmp.receiver
		this.terminos = true;
	}
}
