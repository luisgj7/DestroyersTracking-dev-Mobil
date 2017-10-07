import { Observable } from 'rxjs/Rx';
export interface IReadService<T> {
	query: (criteria?: any) => Observable<T[]>;
	getById: (_id: string) => Observable<T>;
}

export interface IWriteService<T> {
	save: (item: any) => Observable<T>;
	remove: (id: string) => Observable<boolean>;
}
