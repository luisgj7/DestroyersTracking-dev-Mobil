import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from './../../../core/config.service';
import { HeadersService } from './../../../core/headers.service';
import { BaseService } from './../../../core/base.service';
import { ITracking, ICoords } from './../../interfaces/common.interfaces';

let END_POINT = 'tracking/';

@Injectable()
export class TrackingService extends BaseService<ITracking> {


	constructor(
		private _http: Http,
		private _headersSrv: HeadersService,
		private _configSrv: ConfigService
	) {
		super(END_POINT, _http, _headersSrv, _configSrv);
	}

	ubicacionSrv(coords: ICoords, email) {
		let url = 'http://trackingdestroyers.eastus.cloudapp.azure.com/UbicacionServiceREST.svc/';
		this._http.post(url, { agenteID: email, latitud: coords.lat, longitud: coords.lng }, this._headersSrv.getJsonHeaders())
			.subscribe(data => {
				console.log('data', data);
			}, err => console.log('error', err));
	}
}
