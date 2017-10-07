import { IPerson } from './../../interfaces/common.interfaces';
import { Injectable } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';


@Injectable()
export class ContactsService {


	constructor(
		private _contacts: Contacts
	) {
	}

	pickContact(): Promise<IPerson> {
		return this._contacts.pickContact()
			.then(contact => {
				if (contact) {
					console.log(contact);
					let person: IPerson = {};
					person.fullName = contact.displayName || '';
					person.phone = (contact.phoneNumbers) ? contact.phoneNumbers[0].value : '';
					person.email = (contact.emails) ? contact.emails[0].value : '';
					return person;
				} else return {};
			}).catch(err => console.log(err));
	}
}
