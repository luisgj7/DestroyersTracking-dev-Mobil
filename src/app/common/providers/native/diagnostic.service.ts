import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Injectable()
export class DiagnosticService {
	constructor(
		private _diagnostic: Diagnostic,
		private _locationAccuracy: LocationAccuracy
	) { }

	isLocationAvailable(): Promise<boolean> {
		return this._diagnostic.isLocationAvailable();
	}
	requestLocation(): Promise<boolean> {
		return this._locationAccuracy.request(this._locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
			.then(() => true, error => false);
	}
}
