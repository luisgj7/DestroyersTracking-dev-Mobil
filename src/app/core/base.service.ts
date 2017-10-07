import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { HeadersService } from './headers.service';
import { ConfigService } from './config.service';

import { IReadService, IWriteService } from './base.interfaces';

export class BaseService<T> implements IReadService<T>, IWriteService<T> {

    constructor(
        protected _endPoint_: string,
        protected _http_: Http,
        protected _headersSrv_: HeadersService,
        protected _configSrv_: ConfigService
    ) { }

    query(criteria: any = {}, lastRoute: string = ''): Observable<T[]> {
        // let headers = this._headersSrv.getJsonHeaders(this._identitySrv.token);
        let requestUrl = this._configSrv_.normalizeQuery(this._endPoint_ + lastRoute, criteria);

        return this._http_.get(requestUrl).map(res => {
            let data = res.json();
            if (data.success) return data.result;
            else throw data.error;
        });
    };

    getById(_id: string): Observable<T> {
        let requestUrl = this._configSrv_.buildApiUrl(this._endPoint_, _id);

        return this._http_.get(requestUrl).map(res => {
            let data = res.json();
            if (data.success) return data.result;
            else throw data.error;
        });
    }

    save(item: any): Observable<T> {
        if (!item._id) return this.create(item);
        return this._update(item);
    }

    private create(item: any): Observable<T> {
        let requestUrl = this._configSrv_.buildApiUrl(this._endPoint_);

        return this._http_.post(requestUrl, item).map(res => {
            let data = res.json();
            if (data.success) return data.result;
            else throw data.error;
        });
    }

    private _update(item: any): Observable<T> {
        let requestUrl = this._configSrv_.buildApiUrl(this._endPoint_, item._id);

        return this._http_.put(requestUrl, item).map(res => {
            let data = res.json();
            if (data.success) return data.result;
            else throw data.error;
        });
    }

    remove(_id: string): Observable<boolean> {
        let requestUrl = this._configSrv_.buildApiUrl(this._endPoint_, _id);

        return this._http_.delete(requestUrl).map(res => {
            let data = res.json();
            if (data.success) return true;
            else throw data.error;
        });
    }

}
