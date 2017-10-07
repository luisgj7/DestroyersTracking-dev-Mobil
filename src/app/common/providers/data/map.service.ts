import { ConfigService } from './../../../core/config.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

import { ICoords } from './../../interfaces/common.interfaces';

@Injectable()
export class MapService {

	constructor(
		private _http: Http,
		private _configSrv: ConfigService
	) {
	}

	getPolyline(origin: ICoords, destination: ICoords, type: string = 'coords'): Promise<any> {
		let url = this._configSrv.buildApiUrl('maps/','polyline');

		return this._http.post(url, { origin, destination, type }).map(res => {
			let data = res.json();
			if (data.success) return data.result;
			return [];
		}).toPromise();
	}
	getDistanceMatrix(origin: ICoords, destination: ICoords): Promise<any> {
		let url = this._configSrv.buildApiUrl('maps/','distanceMatrix');

		return this._http.post(url, { origin, destination }).map(res => {
			let data = res.json();
			if (data.success) return data.result;
			return [];
		}).toPromise();
	}


	getAutoComplete(criteria: IAutocompleteCriteria): Promise<any[]> {
		let url = this._configSrv.buildApiUrl('maps/','autoComplete');

		return this._http.post(url, criteria).map(res => {
			let data = res.json();
			if (data.success) return data.result;
			return [];
		}).toPromise();
	}

	getPlaceDetails(criteria: IPlaceDetailsCriteria): Promise<any> {
		let url = this._configSrv.buildApiUrl('maps/','placeDetails');

		return this._http.post(url, criteria).map(res => {
			let data = res.json();
			if (data.success) return data.result;
			return [];
		}).toPromise();
	}
}

export interface IAutocompleteCriteria {
	input: string;
	country?: string;
	coords?: ICoords;
	radius_km?: number;
}

export interface IPlaceDetailsCriteria {
	placeid?: string;
	reference?: string;
	coords?: ICoords;
}
