import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './../../../core/config.service';
import { HeadersService } from './../../../core/headers.service';
import { BaseService } from './../../../core/base.service';
import { User } from './../../../core/user';

let END_POINT = 'users/';

@Injectable()
export class UserService extends BaseService<User> {
	constructor(
		private _http: Http,
		private _headersSrv: HeadersService,
		private _configSrv: ConfigService
	) {
		super(END_POINT, _http, _headersSrv, _configSrv);
	}
}
