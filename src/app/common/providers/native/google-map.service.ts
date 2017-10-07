import { Constants } from './../../../core/constants.service';
import { ICoords } from './../../interfaces/common.interfaces';
import { Injectable } from '@angular/core';
import {
	GoogleMaps,
	GoogleMap,
	GoogleMapsEvent,
	CameraPosition,
	MarkerOptions,
	Marker,
	PolylineOptions,
	LatLng,
} from '@ionic-native/google-maps';

declare var plugin;
declare var google;

const DEFAULT_ZOOM: number = 17;

@Injectable()
export class GoogleMapService {
	private _map: GoogleMap;
	private _markers: Marker[] = [];
	private _markersRoute: Marker[] = [];
	private _markersRouteDriver: Marker;
	private _polylineTracking;
	private _polylineDriver;
	private _myMarker: Marker;

	constructor(
		private _googleMaps: GoogleMaps
	) {
	}
	initMap(coords?: ICoords) {
		this._markers = [];
		this._map = new GoogleMap('map');
		return this._map.one(GoogleMapsEvent.MAP_READY);
	}

	gettMyLocation() {
		return this._map.getMyLocation()
			.then(location => {
				this.setCenter(location);
				return location;
			});
	}

	setCenter(coords: any, options: any = {}): Promise<any> {
		let target: any;

		if (coords.latLng) target = <LatLng>coords.latLng;
		else target = new LatLng(coords.lat, coords.lng);

		return this._map.animateCamera({
			target,
			zoom: options.zoom || DEFAULT_ZOOM,
			tilt: options.tilt || 0,
			bearing: options.bearing || 0,
			duration: options.duration || 1000
		});
	}

	setZoom(zoom: number = DEFAULT_ZOOM): void {
		this._map.setZoom(zoom);
	}

	setClickable(isClickable: boolean): void {
		try {
			this._map.setClickable(isClickable);
		} catch (error) {
			console.log('Map not defined!');
		}
	}

	setMarkersRoute(points: any[]): void {
		this.clearMarkersRoute();
		let iconSize = {
			width: 40,
			height: 40
		};

		points.forEach(point => {
			let icon = {
				url: (point === points[0]) ? Constants.mapMarkers.img.pickup : Constants.mapMarkers.img.drop,
				size: {
					width: Math.round(iconSize.width),
					height: Math.round(iconSize.height)
				}
			}
			let markerOptions: MarkerOptions = {
				position: new LatLng(point.lat, point.lng),
				disableAutoPan: true,
				icon
			};
			this._map.addMarker(markerOptions)
				.then((m: Marker) => {
					this._markersRoute.push(m);
				});
		});
	}

	setMarkersRouteDriver(coords, magneticHeading): void {
		if (!this._markersRouteDriver) {
			let markerOptions: MarkerOptions = {
				position: new LatLng(coords.lat, coords.lng),
				icon: Constants.mapMarkers.img.car,
				rotation: magneticHeading,
				disableAutoPan: true
			};
			if (this._map) {
				this.clearMarkersRouteDriver();
				this._map.addMarker(markerOptions)
					.then((marker: Marker) => {
						marker.showInfoWindow();
						this._markersRouteDriver = marker;
					});
			}
		} else {
			let position = new LatLng(coords.lat, coords.lng);
			this._markersRouteDriver.setPosition(position);
			magneticHeading = magneticHeading || 1;
			this._markersRouteDriver.setRotation(magneticHeading);
		}
	}

	clearMarkersCars(): void {
		this._markers.forEach(marker => marker.remove());
		this._markers = [];
	}
	clearMarkersRoute(): void {
		this._markersRoute.forEach(marker => marker.remove());
	}
	clearMarkersRouteDriver(): void {
		if (this._markersRouteDriver) {
			this._markersRouteDriver.remove();
		}
		if (this._polylineDriver) {
			this._polylineDriver.remove();
			this._polylineDriver = undefined;
		};
	}

	addPolyLine(coords: ICoords[], center: boolean): Promise<any> {
		this._removePolyLine();

		let points = coords.map(coord => new plugin.google.maps.LatLng(coord.lat, coord.lng));

		let options: PolylineOptions = {
			points,
			visible: true,
			geodesic: true,
			color: '#1b1b1b',	// #1fbad6
			width: 4
		};
		return this._map.addPolyline(options)
			.then(result => this._polylineTracking = result)
			.then(() => {
				if (center) return this._centerCamera(coords);
				return {};
			});
	}

	addPolyLineDriver(coords: ICoords[]): void {
		this.clearMarkersRouteDriver();
		let points = coords.map(coord => new plugin.google.maps.LatLng(coord.lat, coord.lng));

		let options: PolylineOptions = {
			points,
			visible: true,
			geodesic: true,
			color: '#1fbad6',	// #1fbad6
			width: 4
		};

		this._map.addPolyline(options)
			.then(result => this._polylineDriver = result);
	}

	decodeCoords(polyline: string): ICoords[] {
		let coordsDecs: any[] = new google.maps.geometry.encoding.decodePath(polyline);
		let coords: ICoords[] = [];
		coordsDecs.forEach(coordsDec => {
			coords.push({ lat: coordsDec.lat(), lng: coordsDec.lng() });
		});
		return coords;
	}


	clearRoute(): void {
		if (this._map) {
			this._map.clear();
			if (this._myMarker) this._myMarker.remove();
			this._myMarker = undefined;
			this.clearMarkersRouteDriver();
		}
	}

	setMyMarker(coords): void {
		if (this._map) {
			if (this._myMarker && this._map.get('_myMarker')) {
				this._myMarker.setPosition(new LatLng(coords.lat, coords.lng));
			} else if (this._map.get('_myMarker')) {
				let markerOptions: MarkerOptions = {
					position: new LatLng(coords.lat, coords.lng),
					icon: Constants.mapMarkers.img.car,
					rotation: 0,
					disableAutoPan: true
				};
				this._map.addMarker(markerOptions)
					.then((marker: Marker) => {
						marker.showInfoWindow();
						if (this._myMarker) this._myMarker.remove();
						this._myMarker = marker;
					}).catch(error => console.log(error));
			}
		}
	}

	showMyMarker(state: boolean): void {
		if (!state && this._myMarker) {
			this._myMarker.remove();
			this._myMarker = undefined;
		}
		if (this._map) this._map.set('_myMarker', state)
	}

	private _centerCamera(coords: ICoords[]): Promise<any> {
		let points: any[] = [];
		coords.forEach(coord => points.push(new plugin.google.maps.LatLng(coord.lat, coord.lng)));

		let latLngBounds = new plugin.google.maps.LatLngBounds(points);

		return this._map.animateCamera({ target: latLngBounds, duration: 1000 })
			.then(() => this._map.getCameraPosition())
			.then(position => {
				return this._map.animateCamera({
					zoom: position.zoom - 0.7,
				});
			});
	}

	private _removePolyLine(): void {
		if (this._polylineTracking) {
			this._polylineTracking.remove()
			this._polylineTracking = undefined;
		};
	}

}
