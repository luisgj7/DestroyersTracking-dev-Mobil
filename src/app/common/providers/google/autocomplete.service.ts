import { IAutocompleteCriteria } from './../data/map.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
@Injectable()
export class AutocompleteService {

	private googleApiConfig = {
		url: 'https://maps.googleapis.com/maps/api',
		apiKey: 'AIzaSyCLqfrJeRKkKdv6b4gI2B7t66pRo5kjWD4',
		type: 'json'
	}

	constructor(
		private _http: Http
	) { }

	get(criteria: IAutocompleteCriteria): Promise<any[]> {
		let query = `input=${criteria.input}`;
		if (criteria.country) query += `&components=country:${criteria.country.toLowerCase()}`;
		if (criteria.coords) query += `&location=${criteria.coords.lat},${criteria.coords.lng}`;
		// if (!criteria.type) query += '&type=' + (!criteria.type ? 'address' : criteria.type);
		if (criteria.radius_km) {
			criteria.radius_km = criteria.radius_km * 1000;
			query += `&radius=${criteria.radius_km}&strictbounds`;
		}

		let urlRequest = this.endPoint.autoComplete + query;

		return this._http.get(urlRequest).map(res => {
			let data = res.json();
			if (data.status == 'OK')
				return data.predictions.map(prediction => {
					let description: any = {
						main: prediction.structured_formatting.main_text || '',
						secondary: prediction.structured_formatting.secondary_text || ''
					};

					if (description.secondary) {
						let index = description.secondary.lastIndexOf(',');
						if (index > -1) description.secondary = description.secondary.substring(0, description.secondary.lastIndexOf(',')).trim();
					}
					return {
						format: prediction.description,
						description,
						place_id: prediction.place_id,
						reference: prediction.reference
					}
				});
			else return [];
		}).toPromise();
	}

	private get endPoint() {
		return {
			direction: `${this.googleApiConfig.url}/directions/${this.googleApiConfig.type}?key=${this.googleApiConfig.apiKey}&`,
			distanceMatrix: `${this.googleApiConfig.url}/distancematrix/${this.googleApiConfig.type}?key=${this.googleApiConfig.apiKey}&`,
			autoComplete: `${this.googleApiConfig.url}/place/autocomplete/${this.googleApiConfig.type}?key=${this.googleApiConfig.apiKey}&`,
			placeDetails: `${this.googleApiConfig.url}/place/details/${this.googleApiConfig.type}?key=${this.googleApiConfig.apiKey}&`,
			geocodeMap: `${this.googleApiConfig.url}/geocode/${this.googleApiConfig.type}?key=${this.googleApiConfig.apiKey}&`,
			staticMap: `${this.googleApiConfig.url}/staticmap?key=${this.googleApiConfig.apiKey}&`
		};
	}
}
