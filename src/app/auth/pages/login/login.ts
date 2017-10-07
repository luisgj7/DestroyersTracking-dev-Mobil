import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';

import { User } from './../../../core/user';
import { ToastrService } from './../../../common/providers/native/toastr.service';
import { AuthService } from './../../providers/auth.service';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	loading: any;

	user: User = {};
	showInputEmail: boolean;
	showInputPassword: boolean;
	keyboardHeight: any;

	constructor(
		private _navCtrl: NavController,
		private _formBuilder: FormBuilder,
		private _loadingCtrl: LoadingController,
		private _menuCtrl: MenuController,
		private _authSrv: AuthService,
		private _toastrSrv: ToastrService,
		private _keyboardCtrl: Keyboard
	) {
		this._menuCtrl.enable(false);
		this._keyboardCtrl.hideKeyboardAccessoryBar(true);
		this._keyboardCtrl.disableScroll(true)
		this._keyboardCtrl.onKeyboardShow()
			.subscribe(data => this.keyboardHeight = { 'bottom.px': data.keyboardHeight });
		this._keyboardCtrl.onKeyboardHide()
			.subscribe(() => {
				this.keyboardHeight = { 'bottom.px': 0 };
				this.showInputEmail = this.showInputPassword = false;
			});
	}

	ngOnInit() {

	}

	login() {
		if (this._validate()) {
			this.loading = this._loadingCtrl.create({ content: 'Autenticando' });
			this.loading.present();

			this._authSrv.standardLogin(this.user.email, this.user.password)
				.subscribe(
				() => this.onSuccess(),
				error => this.onFail(error)
				);
		}
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

	forgotPassword() {

	}

	gotoJoin() {
		this._navCtrl.setRoot('JoinPage');
	}

	onSuccess(): void {
		this._navCtrl.setRoot('HomePage');
		this._menuCtrl.enable(true);
		this.loading.dismiss();
	}

	onFail(error: string): void {
		error = (typeof (error) === 'string') ? error : 'Contraseña incorrecta.';
		this.loading.dismiss();
		this._toastrSrv.show(error);
	}

	private _validate(): boolean {
		return !!this.user.email && !!this.user.password;
	}

}
