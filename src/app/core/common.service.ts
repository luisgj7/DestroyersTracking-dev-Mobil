import { Constants } from './constants.service';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class CommonService {

	constructor(private _configSrv: ConfigService) { }

	buildApiUrl(endPoint: string, ...params: string[]): string {
		if (!endPoint.endsWith('/')) endPoint += '/';

		let apiUrl = this._configSrv.BASE_URL + endPoint;
		return apiUrl + params.join('/');
	}

	normalizeQuery(endPoint: string, criteria: any): string {
		let apiUrl = this.buildApiUrl(endPoint).slice(0, -1);
		return apiUrl + this.getQueryString(criteria);
	}

	getQueryString(criteria?: any): string {
		if (!criteria) return '';
		var query = Object.keys(criteria).map(key => `${key}=${criteria[key]}&`).join('');
		return '?' + query.slice(0, -1);
	}

	contains(text: string, val: string): boolean {
		return text.indexOf(val) > -1;
	}

	toggleListItem(list: any[], item: any): any[] {
		let index = list.indexOf(item);

		if (index > -1) list.splice(index, 1);
		else list.push(item);

		return list;
	}

	replaceListItem(list: any[], item: any): any[] {
		let index = list.indexOf(item);

		if (index > -1) list.splice(index, 1, item);

		return list;
	}

	setBgImageStyle(bgImage?: string): any {
		bgImage = bgImage || Constants.paths.DEFAULT_BG_IMAGE;
		return { 'background-image': `url(${bgImage})` };
	}

	validatePhone(phone: any): string {
		if (typeof (phone) === 'string') {
			return phone;
		} else if (typeof (phone) === 'object') {
			let cell = phone['cell'];

			if (cell) {
				return cell;
			} else {
				for (let key in phone) {
					if (phone[key]) return phone[key];
				}

				throw Constants.messages.error.PHONE_NUMBER;
			}
		} else {
			throw Constants.messages.error.PHONE_NUMBER;
		}
	}

	validateEmail(email): boolean {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	getRandom(start: number = 0, end: number = 100): number {
		return Math.floor(Math.random() * end) + start;
	}

	generateCode(): number {
		return this.getRandom(1000, 9000);
	}
}
