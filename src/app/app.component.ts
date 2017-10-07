import { GoogleMapService } from './common/providers/native/google-map.service';
import { ITracking, ICoords } from './common/interfaces/common.interfaces';
import { GeolocationService } from './common/providers/native/geolocation.service';
import { SocketService } from './socket/Socket';
import { UserService } from './common/providers/data/user.service';
import { User } from './core/user';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { HeaderColor } from '@ionic-native/header-color';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Component, ViewChild } from '@angular/core';

import { IdentityService } from './core/identity.service';
import { Constants } from './core/constants.service';
import { OneSignalService } from './core/onesignal.service';
import { PlatformMonitorService } from './common/providers/native/platform-monitor.service';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;

	currentUser: any;
	tempProfileImage: string = Constants.paths.UNKNOWN_USER_IMAGE;
	menuItems: any[];
	pages: Array<{ title: string, component: any }>;
	private _currentPuhsToken: string;

	constructor(
		private _platform: Platform,
		private _splashScreen: SplashScreen,
		private _statusBar: StatusBar,
		private _headerColor: HeaderColor,
		private _identitySrv: IdentityService,
		private _menuCtrl: MenuController,
		private _onesignalSrv: OneSignalService,
		private _platformMtrSrv: PlatformMonitorService,
		private _userSrv: UserService,
		private _events: Events,
		private _geolocationSrv: GeolocationService,
		private _googleMapSrv: GoogleMapService
	) {
		this._initializeApp();
		this._setPages();
	}

	openPage(item) {
		this._menuCtrl.close();
		if (item.page) this.nav.setRoot(item.page);
	}

	menuClosed() {
		this._events.publish('menu:closed', '');
	}

	menuOpened() {
		this._events.publish('menu:opened', '');
	}

	private _initializeApp() {
		this._platform.ready().then(() => {

			let splash = this._splashScreen;
			this._statusBar.backgroundColorByHexString('#009688');
			this._statusBar.overlaysWebView(false);
			this._headerColor.tint('#009688');
			this._onesignalSrv.init(payload => this._pushAction(payload));
			this._getAppUser();

			setTimeout(() => {
				splash.hide();
			}, 1000);
		});
	}

	private _setPages() {
		this.menuItems =
			[
				{ name: 'Inicio', page: 'HomePage', icon: { name: 'home' } },
				{ name: 'TrackingPage', page: 'TrackingPage', icon: { name: 'home' } },
			];
	}

	private _getAppUser(): void {
		this._identitySrv.getCurrentUser()
			.then(user => {
				if (user) {
					this._init(user);
					this.rootPage = 'HomePage';
				} else {
					this.rootPage = 'LoginPage';
				}

				this._identitySrv.subscriber
					.subscribe(user => {
						this._init(user);
					});
			});
	}

	private _init(user: User) {
		this._setCurrentUser(user);
		if (user && user._id) {
			SocketService.init(user._id);
			this._handlePushTokens(user);
			this._handlertracking();
			this._identitySrv.getCurrentTracking();
		}
	}

	private _setCurrentUser(user): void {
		this.currentUser = user;
	}

	private _pushAction(data?: any): void {
		this._menuCtrl.close();

	}

	private _handlePushTokens(user: User) {
		if (this._platformMtrSrv.isDevice())
			this._onesignalSrv.getIds()
				.then(result => {
					if (user) {
						this._onesignalSrv.setSubscription(true);

						if (!this._currentPuhsToken) {
							this._currentPuhsToken = result.userId;
							if (result.userId != user.pushToken) {
								user.pushToken = result.userId;
								this._userSrv.save({ _id: user._id, pushToken: user.pushToken })
									.subscribe(user => {
										if (this._identitySrv.user) this._identitySrv.user.pushToken = user.pushToken;
									});
							}
						}
					} else {
						this._onesignalSrv.setSubscription(false);
						this._currentPuhsToken = undefined;
					}
				});
	}

	private _handlertracking() {
		// this._identitySrv.subscriberTracking
		// 	.subscribe(tracking => {
		// 		this._handlerPosition(tracking);
		// 	});
		this._identitySrv.subscriberCoords
			.subscribe(coords => {
				let tracking = this._identitySrv.tracking || {};
				if (tracking._id && coords) SocketService.updatePosition({ coords, trackingId: tracking._id });
			})
	}
	private _handlerPosition(tracking: ITracking) {
		let position = this._geolocationSrv.watchPosition()
			.subscribe(post => {
				this._identitySrv.getCurrentTracking()
					.then(tmp => {
						if (tmp && post.coords && this._identitySrv.user._id && tracking && tracking.status === Constants.trackginStatus.PICKUP) {
							let coords: ICoords = {
								lat: post.coords.latitude,
								lng: post.coords.longitude
							};
							SocketService.updatePosition({ coords: coords, trackingId: tracking._id });
						} else {
							position.unsubscribe();
						}
					})
			});
		if (!tracking) position.unsubscribe();
	}
}
