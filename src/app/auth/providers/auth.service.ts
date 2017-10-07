import { User } from './../../core/user';
import { StorageService } from './../../core/storage.service';
import { IdentityService } from './../../core/identity.service';
import { ConfigService } from './../../core/config.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthService {

	constructor(
		private _http: Http,
		private _configSrv: ConfigService,
		private _identitySrv: IdentityService,
		private _storageSrv: StorageService
	) { }

	standardLogin(email: string, password: string): Observable<User> {
		let url = this._configSrv.buildApiUrl('auth/', 'login');

		return this._http.post(url, { email, password }).map(res => {
			let data = res.json();
			return this._setUserData(data);
		});
	}

	signup(newUser: User, url?: string): Promise<User> {
		url = url || this._configSrv.buildApiUrl('auth/', 'signup/');

		return this._http.post(url, newUser).map(res => {
			let data = res.json();
			return this._setUserData(data);
		}).toPromise();
	}

	logout(): Promise<any> {
		return this._storageSrv.clearAll();
	}

	validateEmail(email: string): Observable<User> {
		let query = this._configSrv.buildApiUrl('auth/', 'validateEmail', email.trim());

		return this._http.get(query).map(res => {
			let data = res.json();
			if (data.success) return data.result;
			else throw data.error;
		});
	}

	private _setUserData(data: any): User {
		if (data.success) {
			this._identitySrv.token = data.token;
			this._identitySrv.user = data.result;
			return data.result;
		} else {
			throw data.error;
		}
	}

}
