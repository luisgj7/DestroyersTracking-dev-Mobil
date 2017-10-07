import { ITracking, ICoords } from './../common/interfaces/common.interfaces';
import { Injectable, EventEmitter } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from './user';

@Injectable()
export class IdentityService {

	private _user: User;
	private _isActive: boolean;
	private _token: string;
	private _tracking: ITracking;

	subscriber: EventEmitter<User>;
	subscriberTracking: EventEmitter<ITracking>;
	subscriberCoords: EventEmitter<ICoords> = new EventEmitter<ICoords>();;

	constructor(
		private _storageSrv: StorageService
	) {
		this.subscriber = new EventEmitter<User>();
		this.subscriberTracking = new EventEmitter<ITracking>();
	}

	set user(user: User) {
		if (user) this._storageSrv.setCurrentUser(user);
		else this._storageSrv.clearAll()

		this._user = user;
		this.subscriber.next(user);
	}

	get user(): User {
		return this._user;
	}

	set token(token: string) {
		if (token) this._storageSrv.setToken(token);
		else this._storageSrv.removeToken();

		this._token = token;
	}

	get token(): string {
		return this._token;
	}

	getCurrentUser(): Promise<User> {
		return this._storageSrv.getCurrentUser()
			.then(user => this.user = user)
			.then(() => this._storageSrv.getToken())
			.then(token => this.token = token)
			.then(() => this.user);
	}

	isAuthenticated() {
		return this.user; // && this.token;
	}

	logout() {
		this.token = undefined;
		this.user = undefined;
		this.tracking = undefined;
		this.subscriber.next(undefined);
		this.subscriberTracking.next(undefined);
	}
	//TRIP
	set tracking(tracking: ITracking) {
		if (!tracking) {
			this._storageSrv.setCurrentTracking(tracking);
		} else {
			this._storageSrv.removeCurrentTracking();
		}
		this._tracking = tracking;
		this.subscriberTracking.next(tracking);
	}

	get tracking(): ITracking {
		return this._tracking;
	}

	getCurrentTracking(): Promise<ITracking> {
		return this._storageSrv.getCurrentTracking()
			.then(tracking => {
				this.tracking = tracking;
				return tracking;
			});
	}

	startInit(coords: ICoords[] = []) {
		let i = 0;
		let interval = setInterval(() => {
			if (i < coords.length) {
				this.subscriberCoords.emit(coords[i]);
				i++;
			} else {
				clearInterval(interval);
			}
		}, 100);
	}
}
