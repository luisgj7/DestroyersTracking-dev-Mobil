import { AuthService } from './../../../auth/providers/auth.service';
import { IControls } from './../../interfaces/interfaces';
import { IdentityService } from './../../../core/identity.service';
import { ToastrService } from './../../../common/providers/native/toastr.service';
import { UserService } from './../../../common/providers/data/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../core/user';
import { Component } from '@angular/core';
import { IonicPage, ViewController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-profile-edit',
	templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

	user: User;
	userForm: FormGroup;
	bgStyle: any;
	loader: any;
	sim: any = {};
	country: any = {};

	tempProfileImage = './assets/user/unknown-user.png';
	tempBgImage: string = './assets/user/bg-profile.jpg';

	isTempProfileSelected: boolean = false;
	isTempBgSelected: boolean = false;

	constructor(
		private _viewCtrl: ViewController,
		private _userSrv: UserService,
		private _toastrSrv: ToastrService,
		private _identitySrv: IdentityService,
		private _loadingCtrl: LoadingController,
		private _formBuilder: FormBuilder,
		private _authSrv: AuthService
	) {
		this.user = this._identitySrv.user;
	}

	ngOnInit() {
		this.setProfileImage();
		this.setBgImage();

		this._buildForm();
		this._setFormData();
	}

	setProfileImage(filePath?: string): void {
		if (!filePath) {
			this.tempProfileImage = this.tempProfileImage;
			this.isTempProfileSelected = false;
		}
		else {
			this.tempProfileImage = filePath || this.tempProfileImage;
			this.isTempProfileSelected = !!filePath;
		}
	}

	setBgImage(filePath?: string): void {
		if (!filePath) {
			this.tempBgImage =  this.tempBgImage;
			this.isTempBgSelected = false;
			this.bgStyle = this._setBgImageStyle(this.tempBgImage);
		} else {
			this.tempBgImage = filePath || this.tempBgImage;
			this.isTempBgSelected = !!filePath;;
			this.bgStyle = this._setBgImageStyle(filePath || this.tempBgImage);
		}
	}


	save(): void {
		try {
			this._validate()
			if (this.userForm.valid) {
				this._validateEmail()
					.subscribe(user => {
						if (user._id === this.user._id || !user._id) this._saveData();
						else this._toastrSrv.show('Este email ya fué registrado');
					})
			}
		} catch (error) {
			this._toastrSrv.show(error);
		}
	}

	close(): void {
		this._viewCtrl.dismiss();
	}

	private _saveData(): void {
		this.loader = this._loadingCtrl.create({ content: 'Guardando ...' });
		this.loader.present();

		// this.user.profileImage = this.isTempProfileSelected ? this.tempProfileImage : this.user.profileImage;
		// this.user.bgImage = this.isTempBgSelected ? this.tempBgImage : this.user.bgImage;

		let user: User = Object.assign({}, this.user, this.userForm.value);

		this._userSrv.save({
			_id: user._id,
			email: user.email,
			fullName: user.fullName,
			// profileImage: user.profileImage,
			// bgImage: user.bgImage
		})
			.subscribe(updatedUser => {
				this.loader.dismiss();
				this._identitySrv.user = updatedUser;
				this._viewCtrl.dismiss(updatedUser);
			});
	}

	private _setFormData(): void {
		let form: any = this.userForm.controls;
		let user = this.user;

		form.fullName.setValue(user.fullName);
		form.email.setValue(user.email);
	}

	private _buildForm(): void {
		this.userForm = this._formBuilder.group({
			email: ['', Validators.required],
			fullName: ['', Validators.required]
		});
	}

	private _validate() {
		if (this.userForm.valid) return;

		let controls: IControls[] = [
			{ field: 'email', label: 'Correo electrónico' },
			{ field: 'fullName', label: 'Nombre de usuario' }
		];

		controls.forEach(control => {
			if (!control.controls) {
				if (this.userForm.controls[control.field].errors) throw `${control.label} es requerido.`
			} else {
				control.controls.forEach(innerControl => {
					if (this.userForm.controls[control.field]['controls'][innerControl.field].errors) throw `${innerControl.label} es requerido.`;
				});
			};
		});
	}

	private _validateEmail() {
		return this._authSrv.validateEmail(this.userForm.value.email);
	}

	private _setBgImageStyle(bgImage?: string): any {
		bgImage = bgImage || this.tempBgImage;
		return { 'background-image': `url(${bgImage})` };
	}

}
