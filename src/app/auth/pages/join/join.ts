import { CommonService } from './../../../core/common.service';
import { Keyboard } from '@ionic-native/keyboard';
import { User } from './../../../core/user';
import { IonicPage, NavController, ViewController, MenuController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from './../../providers/auth.service';
import { ToastrService } from './../../../common/providers/native/toastr.service';

@IonicPage()
@Component({
	selector: 'page-join',
	templateUrl: 'join.html',
})
export class JoinPage {

	loading: any;
	user: User = {};
	showInputEmail: boolean;
	showInputPassword: boolean;
	keyboardHeight: any;

	constructor(
		private _navCtrl: NavController,
		private _viewCtrl: ViewController,
		private _menuCtrl: MenuController,
		private _loadingCtrl: LoadingController,
		private _formBuilder: FormBuilder,
		private _toastrSrv: ToastrService,
		private _authSrv: AuthService,
		private _keyboardCtrl: Keyboard,
		private _commonSrv: CommonService
	) {
	}

	ngOnInit() {
		this._menuCtrl.enable(false);
		this._keyboardCtrl.hideKeyboardAccessoryBar(true);
		this._keyboardCtrl.disableScroll(true)
		this._keyboardCtrl.onKeyboardShow()
			.subscribe(data => {
				this.keyboardHeight = { 'bottom.px': data.keyboardHeight };
				console.log(this.keyboardHeight);
			});
		this._keyboardCtrl.onKeyboardHide()
			.subscribe(() => {
				this.keyboardHeight = { 'bottom.px': 0 };
				this.showInputEmail = this.showInputPassword = false;
			});
	}

	gotoLogin() {
		this._navCtrl.setRoot('LoginPage');
	}

	back() {
		this._viewCtrl.dismiss(false);
	}

	join() {
		if (this._validate()) {
			this.loading = this._loadingCtrl.create({ content: 'Autenticando ...' });
			this.loading.present();

			this._authSrv.signup(this.user)
				.then(() => this.onSuccess())
				.catch(error => this.onFail(error));
		}
	}

	onSuccess(): void {
		this._navCtrl.setRoot('HomePage');
		this._menuCtrl.enable(true);
		this.loading.dismiss();
	}

	onFail(error: string): void {
		this.loading.dismiss();
		this._toastrSrv.show(error);
	}

	goToTerms() {
	}

	onFocus(type: string) {
		switch (type) {
			case 'email':
				this.showInputEmail = true;
				this.showInputPassword = false;
				break;
			default:
				this.showInputPassword = true;
				this.showInputEmail = false;
				break;
		}
	}

	private _validate(): boolean {
		let st = !!this.user.email && !!this.user.password && !!this.user.fullName;
		if (st) {
			if (!this._commonSrv.validateEmail(this.user.email)) {
				this._showToast('Ingrese un correo correcto.');
				return false;
			} else if (this.user.password.length < 8) {
				this._showToast('La contraseña debe contener 8 caracteres');
				return false;
			} else if (!this.user.fullName.length) {
				this._showToast('La nombre debe ser rellenado');
				return false;
			} else if (this.user.phone.length != 9) {
				this._showToast('La teléfono debe tener 9 dígitos');
				return false;
			}
			return true;
		}
		this._showToast('Porfavor, ingresar todos los campos.');
		return false;
	}

	private _showToast(msg) {
		this._toastrSrv.show(msg);
	}

}
