import { Constants } from './constants.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from './user';

@Injectable()
export class StorageService {

	constructor(private _storage: Storage) { }
	setCurrentUser(data: Object): void {
		this._storage.set(Constants.storage.CURRENT_USER, JSON.stringify(data));
	}

	getCurrentUser(): Promise<User> {
		return this._storage.get(Constants.storage.CURRENT_USER)
			.then(data => data ? JSON.parse(data) : undefined);
	}

	removeCurrentUser(): Promise<any> {
		return this._storage.remove(Constants.storage.CURRENT_USER);
	}

	clearAll() {
		return this._storage.clear();
	}

	setToken(token: string): void {
		this._storage.set(Constants.storage.CURRENT_USER_TOKEN, token);
	}

	getToken(): Promise<string> {
		return this._storage.get(Constants.storage.CURRENT_USER_TOKEN)
			.then(token => token ? token : undefined);
	}

	removeToken(): Promise<any> {
		return this._storage.remove(Constants.storage.CURRENT_USER_TOKEN);
	}

	//TRIP
    setCurrentTracking(data: Object): void {
        this._storage.set(Constants.storage.CURRENT_TRACKING, JSON.stringify(data));
    }

    getCurrentTracking(): Promise<any> {
        return this._storage.get(Constants.storage.CURRENT_TRACKING)
            .then(data => data ? JSON.parse(data) : undefined);
    }

    removeCurrentTracking(): Promise<any> {
        return this._storage.remove(Constants.storage.CURRENT_TRACKING);
    }

}
