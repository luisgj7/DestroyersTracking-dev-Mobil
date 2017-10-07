export interface ICoords {
	lat?: number;
	lng?: number;
	miles?: number;
}
export interface ITracking {
	_id?: string;
	pickup?: IPlace;
	drop?: IPlace;

	sender?: IPerson;
	receiver?: IPerson;
	agent?: IPerson;
	car?: ICar;
	code?: string;
	position?: ICoords;

	description?: string;
	picturePickUp?: string;
	pictureDrop?: string;

	status?: string;

	createdOn?: string;
	modifiedOn?: string;
}

export interface IPlace {
	address?: string,
	coords?: ICoords,
	reference?: string;
}

export interface ICoords {
	lat?: number;
	lng?: number;
}

export interface IPerson {
	_id?: string;
	fullName?: string;
	phone?: string;
	email?: string;
}
export interface ICar{
	model?: string;
	plate?: string;
}
