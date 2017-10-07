import { Component } from '@angular/core';
import { AuthService } from './../../../auth/providers/auth.service';
import { IdentityService } from './../../../core/identity.service';
import { User } from './../../../core/user';
import { IonicPage, NavController, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	user: User = {};
	bgStyle: any = '';
	UNKNOWN_USER_IMAGE = './assets/user/unknown-user.png';
	tempBgImage: string = './assets/user/bg-profile.jpg';
	isTempBgSelected: boolean = false;

	showToolbar: boolean = false;
	transition: boolean = false;
	headerImgSize: string = '100%';
	headerImgUrl: string = '';

	constructor(
		private _navCtrl: NavController,
		private _modalCtrl: ModalController,
		private _identitySrv: IdentityService,
		private _authSrv: AuthService
	) {
		this.user = this._identitySrv.user;
	}

	ngOnInit() {
		this.setBgImage();
	}

	edit(): void {
		let modal = this._modalCtrl.create('ProfileEditPage');
		modal.onDidDismiss(userUpdate => {
			if (userUpdate) {
				this.user = userUpdate;
				this.setBgImage();
			}
		});
		modal.present();
	}

	setBgImage(filePath?: string): void {
		if (!filePath) {
			this.tempBgImage = this.tempBgImage;
			this.isTempBgSelected = false;
			this.bgStyle = this._setBgImageStyle(this.tempBgImage);
		} else {
			this.tempBgImage = filePath || this.tempBgImage;
			this.isTempBgSelected = !!filePath;;
			this.bgStyle = this._setBgImageStyle(filePath || this.tempBgImage);
		}
	}

	logout(): void {
		this._authSrv.logout()
			.then(() => {
				this._identitySrv.logout();
				this._navCtrl.setRoot('LoginPage');
			});
	}

	onScroll(event) {
		let scrollTop = event.scrollTop;
		this.showToolbar = scrollTop >= 80;
		if (scrollTop < 0) this.transition = false;
		else this.transition = true;
	}

	private _setBgImageStyle(bgImage?: string): any {
		bgImage = bgImage || this.tempBgImage;
		return { 'background-image': `url(${bgImage})` };
	}

}
