import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-deny',
	templateUrl: 'deny.html'
})
export class DenyPage {

	tracking: any = {};
	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _menuCtrl: MenuController
	) {
		this._menuCtrl.enable(false);
		this.tracking = this._navParams.get('tracking') || {};
	}

	ngOnInit() {

	}

	comeBack() {
		this._navCtrl.setRoot('RequestPage', { tracking: this.tracking, type: 'tmp' });
	}
}
