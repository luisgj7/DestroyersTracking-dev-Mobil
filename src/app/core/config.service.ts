import { Injectable } from '@angular/core';

const ENV = 'production';
const IP = '192.168.1.36';
const PORT = '3000';

@Injectable()
export class ConfigService {

	BASE_URL: string;

	constructor() {
		this.BASE_URL = this._getBaseUrl();
	}

	private _getBaseUrl(): string {
		let urls = {
			local: `http://${IP}:${PORT}/`,
			dev: 'https://destroyers-tracking-dev.herokuapp.com/',
			production: 'https://destroyers-tracking.herokuapp.com/'
		};

		return urls[ENV];
	}

	buildApiUrl(endPoint: string, ...params: string[]): string {
		let apiUrl = this.BASE_URL + 'api/' + endPoint;
		return apiUrl + params.join('/');
	}

	normalizeQuery(endPoint: string, criteria: Object = {}): string {
		let query = '?';

		Object.keys(criteria).forEach(key => query += `${key}=${criteria[key]}&`);

		return this.buildApiUrl(endPoint) + query.slice(0, -1);
	}

}
