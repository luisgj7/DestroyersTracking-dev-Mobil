import { ITracking } from './../../../common/interfaces/common.interfaces';
import { ToastrService } from './../../../common/providers/native/toastr.service';
import { Constants } from './../../../core/constants.service';
import { IdentityService } from './../../../core/identity.service';
import { TrackingService } from './../../../common/providers/data/tracking.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-completed-tracking',
	templateUrl: 'completed-tracking.html'
})
export class FinishTrackingPage {

	tracking: ITracking = {};
	DEFAULT_IMG = './assets/images/gallery.png';

	constructor(
		private _navCtrl: NavController,
		private _navParams: NavParams,
		private _trackginSrv: TrackingService,
		private _loadingCtrl: LoadingController,
		private _identitySrv: IdentityService,
		private _clipboard: Clipboard,
		private _toastrSrv: ToastrService,
		private _menuCtrl: MenuController
	) {
		this._menuCtrl.enable(true);
		this.tracking = this._navParams.get('tracking') || {};
	}

	ngOnInit() {
		this.tracking.modifiedOn = moment(this.tracking.modifiedOn).format('llll');
	}

}
