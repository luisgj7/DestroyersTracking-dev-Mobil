import { GoogleMapService } from './../../../common/providers/native/google-map.service';
import { AutocompleteService } from './../../../common/providers/google/autocomplete.service';
import { GeolocationService } from './../../../common/providers/native/geolocation.service';
import { MapService } from './../../../common/providers/data/map.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-autocomplete',
	templateUrl: 'autocomplete.html'
})
export class AutocompletePage {

	places: any[] = [];
	loader: boolean;
	constructor(
		private _viewCtrl: ViewController,
		private _navParams: NavParams,
		private _mapService: MapService,
		// private _geolocationSrv: GeolocationService,
		private _autocompletSrv: AutocompleteService,
		private _googleMapSrv: GoogleMapService
	) {
	}

	close(): void {
		this._viewCtrl.dismiss();
	}

	filterPlaces(input): void {
		let text: string = input.target.value;
		this.clearFilter();

		if (text) {
			this.loader = true;
			// .then(coords => this._mapService.getAutoComplete({ input: text, coords, radius_km: 72.4205 })) //45 millas // param Km
			this._autocompletSrv.get({ input: text, coords: this._navParams.get('coords'), radius_km: 72.4205 }) //45 millas // param Km
				.then(places => {
					this.places = places.map(place => {
						return {
							text: place.description,
							placeId: place.place_id,
							reference: place.reference
						};
					});
					this.loader = false;
				});
		}
	}

	select(place): void {
		this._mapService.getPlaceDetails({ placeid: place.placeId, reference: place.reference })
			.then(details => this._viewCtrl.dismiss(details));
	}

	clearFilter(): void {
		this.places = [];
	}
}
