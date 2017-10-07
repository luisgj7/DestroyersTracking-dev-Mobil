import { ToastrService } from './../../providers/native/toastr.service';
import { MediaService } from './../../providers/native/media.service';
import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Directive({
	selector: '[csSelectImage]'
})
export class CsSelectImageDirective {

	@Output('csSelectImage') onSelectImage = new EventEmitter();

	constructor(
		private _mediaSrv: MediaService,
		private _toastrSrv: ToastrService,
		private _alertCtrl: AlertController
	) { }

	@HostListener('click')
	getImage(): void {
		this._mediaSrv.setOptions({ cssClass: 'media-action-sheet' })
			.showActions(
			data => {
				if (data)
					if (data.type === 'photo') {
						let alert = this._alertCtrl.create({
							title: 'Confirm crop',
							message: 'Do you want to crop this picture?',
							buttons: [
								{
									text: 'Cancel',
									role: 'cancel',
									handler: () => {
										this.onSelectImage.emit(data.path);
									}
								},
								{
									text: 'Ok',
									handler: () => {
										this.onSelectImage.emit(data.path);
									}
								}
							]
						});
						alert.present();
					} else {
						this.onSelectImage.emit(data.path);
					}
			},
			error => this._toastrSrv.show(error)
			);
	}

}
