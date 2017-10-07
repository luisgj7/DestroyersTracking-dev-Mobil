import { ICar } from './../common/interfaces/common.interfaces';
export interface User {
	_id?: string;
	email?: string;
	fullName?: string;
	car?: ICar;
	phone?: string;
	password?: string;
	status?: string;
	pushToken?: string;

	createdOn?: Date;
	modifiedOn?: Date;
}
