import { Injectable } from '@angular/core';
import * as moment from 'moment';
// declare var moment;

@Injectable()
export class FormatterService {


	contains(text: string, val: string): boolean {
		return text.indexOf(val) > -1;
	}

	capitalize(text: string): string {
		if (typeof (text) !== 'string' || !text) return '';
		return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
	}

	capitalizeAll(text: string): string {
		let getFirstCharsRegex = /(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g;
		return text.toLowerCase().replace(getFirstCharsRegex, char => char.toUpperCase());
	}

	getDateTimeUTCOffset(dateTime?: any): any {
		let offset = moment().utcOffset();
		return moment(dateTime || new Date().toISOString()).add(offset, 'minute').toISOString();
		// return moment(dateTime || new Date().toISOString()).tz('America/Los_Angeles').format();
	}
	getRemainderMinutes(): string {
		let start = moment(new Date());
		let remainder = 60 - start.minute() % 60;
		return moment(start).add("minutes", remainder).toISOString();
	}

}
