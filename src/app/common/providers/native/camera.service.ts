import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

export interface IMediaType {
	PICTURE: number;
	VIDEO: number;
	ALLMEDIA: number;
}

export interface ISourceType {
	PHOTOLIBRARY: number;
	CAMERA: number;
	SAVEDPHOTOALBUM: number;
}

@Injectable()
export class CameraService {

	mediaType: IMediaType;
	pictureSourceType: any;

	constructor(private _camera: Camera) {
		this.mediaType = this._camera.MediaType;
		this.pictureSourceType = this._camera.PictureSourceType;
	}

	getImage(): Promise<any> {
		return this._getMedia(this._camera.MediaType.PICTURE, this._camera.PictureSourceType.PHOTOLIBRARY);
	}

	takePhoto(): Promise<any> {
		return this._getMedia(this._camera.MediaType.PICTURE, this._camera.PictureSourceType.CAMERA);
	}

	takeVideo(): Promise<any> {
		return this._getMedia(this._camera.MediaType.VIDEO, this._camera.PictureSourceType.PHOTOLIBRARY);
	}

	private _getMedia(mediaType: number, sourceType: number): Promise<any> {
		let options: CameraOptions = {
			quality: 70,
			destinationType: this._camera.DestinationType.DATA_URL,
			mediaType,
			sourceType
		};

		return this._camera.getPicture(options).then(imageData => {
			if (!imageData) return '';
			return 'data:image/jpeg;base64,' + imageData;
		});
	}

}
