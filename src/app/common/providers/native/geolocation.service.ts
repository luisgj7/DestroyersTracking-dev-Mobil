import { ICoords } from './../../interfaces/common.interfaces';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class GeolocationService {
	static coords;
	constructor(
		private _geolocation: Geolocation
	) { }

	watchPosition() {
		return this._geolocation.watchPosition({ maximumAge: 10000 });
	}

	getPosition(): Promise<ICoords> {
		return this._geolocation.getCurrentPosition()
			.then(position => {
				GeolocationService.coords = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				return GeolocationService.coords;
			});
	}
}
