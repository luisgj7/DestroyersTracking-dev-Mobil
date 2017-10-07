import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class HeadersService {

	getJsonHeaders(token?: string) {
		let headers = new Headers();

		headers.append('Content-Type', 'application/json');

		if (token) headers.append('Authorization', token);

		return { headers };
	}

}
