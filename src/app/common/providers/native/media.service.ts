import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';

import { CameraService } from './camera.service';
import { PlatformMonitorService } from './platform-monitor.service';

export interface ICameraOptions {
	cssClass?: string;
	crop?: boolean;
	showVideo?: boolean;
}

@Injectable()
export class MediaService {

	private _actionSheet: any;
	private _options: ICameraOptions = {};

	constructor(
		private _platformMtrSrv: PlatformMonitorService,
		private _actionSheetCtrl: ActionSheetController,
		private _cameraSrv: CameraService,
		private _filePath: FilePath
	) { }

	setOptions(options: ICameraOptions): MediaService {
		this._options.cssClass = options.cssClass || '';
		this._options.crop = options.crop || false;
		this._options.showVideo = options.showVideo || false;
		return this;
	}

	showActions(cbSuccess, cbError) {
		this._actionSheet = this._actionSheetCtrl.create({
			title: 'Pick an image from:',
			cssClass: this._options.cssClass,
			buttons: this._getActionButtons(cbSuccess, cbError)
		});

		this._actionSheet.present();
	}

	takeFromGallery(): Promise<any> {
		;
		let promiseFn = this._cameraSrv.getImage();

		return promiseFn.then(path => {
			if (this._platformMtrSrv.isAndroid()) {
				return this._filePath.resolveNativePath(path)
					.then(filePath => {
						return { type: 'photo', path: filePath };
					})
					.catch(err => console.log(err));
			} else {
				return { type: 'photo', path }
			}
		});
	}

	takePhoto(): Promise<any> {
		let promiseFn = this._cameraSrv.takePhoto()

		return promiseFn.then(path => {
			if (this._platformMtrSrv.isAndroid()) {
				return this._filePath.resolveNativePath(path)
					.then(filePath => {
						return { type: 'photo', path: filePath };
					})
					.catch(err => console.log(err));
			} else {
				return { type: 'photo', path }
			}
		});
	}

	takeVideo(): Promise<any> {
		return this._cameraSrv.takeVideo()
			.then(result => {
				if (result) return result;
				else throw result.error;
			});
	}

	private _getActionButtons(cbSuccess, cbError): any[] {
		let isAndroid = this._platformMtrSrv.isAndroid();
		let actionButton = [
			{
				text: 'Video',
				icon: isAndroid ? 'videocam' : null,
				handler: () => {
					this._actionSheet.dismiss();
					this.takeVideo()
						.then(cbSuccess)
						.catch(cbError);
					return false;
				}
			},
			{
				text: 'Gallery',
				icon: isAndroid ? 'images' : null,
				handler: () => {
					this._actionSheet.dismiss();
					this.takeFromGallery()
						.then(cbSuccess)
						.catch(cbError);
					return false;
				}
			},
			{
				text: 'Camera',
				icon: isAndroid ? 'camera' : null,
				handler: () => {
					this._actionSheet.dismiss();
					this.takePhoto()
						.then(cbSuccess)
						.catch(cbError);
					return false;
				}
			},
			{
				text: 'Cancel',
				icon: isAndroid ? 'close' : null,
				role: 'cancel'
			}
		];

		if (!this._options.showVideo) actionButton.splice(0, 1);

		return actionButton;
	}
}
