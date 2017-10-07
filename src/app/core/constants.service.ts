export class Constants {

	static get appName() {
		return 'DestroyersTracking';
	}

	static COMMA_SEPARATOR = ', ';

	static get storage() {
		return {
			BD: '__destroyers-tracking',
			CURRENT_USER: 'current-user',
			CURRENT_TRACKING: 'current-tracking',
			CURRENT_USER_TOKEN: 'current-user-token'
		};
	}

	static get links() {
		return {
			GOOGLE_PLAY_URL: 'https://play.google.com/',
			ITUNES_URL: 'https://www.apple.com/itunes/',
			TERMS_CONDITIONS: "",
			BIZWATTS: ''
		};
	}

	static get paths() {
		return {
			UNKNOWN_USER_IMAGE: './assets/user/unknown-user.png',
			DEFAULT_BG_IMAGE: './assets/user/bg-profile.png'
		};
	}

	static get icons() {
		return {
			ARROW_DROPDOWN: 'arrow-dropdown',
			ARROW_DROPUP: 'arrow-dropup',

		};
	}

	static get iconsSvg() {
		return {
			UPLOAD: 'assets/icon/upload.png',
			SENT: 'assets/icon/sent.png'
		};
	}

	static get messages() {
		return {
			error: {
				ENTER_REQUIRED_INFO: 'Please, enter all the required information.',
				SELECT_USER: 'You must select a user type.',
				CONNECT_WITH_FACEBOOK: 'Connect with Facebook in a real device.',
				UPLOAD_FILE: 'Unable to upload the image. Try, again later.',
				RETRIEVING_DATA: 'Error retrieving data.',
				PHONE_NUMBER: 'No phone number provided.'
			},
			info: {
				AUTHENTICATING: 'Authenticating...',
				SEARCHING_MEMBERS: 'Searching Members...',
				SEARCHING_PARTICIPANTS: 'Searching Participants...',
				RETRIEVING_DATA: 'Retrieving data...',
				CREATE_FEED_PLACEHOLDER: 'Share an article, photo or idea',
				CREATE_SALE_PLACEHOLDER: 'Sell an article, product or service',
				SAVING_DATA: 'Saving data.'
			}
		};
	};

	static get paypal() {
		return {
			initSettings: {
				PayPalEnvironmentProduction: '',
				PayPalEnvironmentSandbox: ''
			},
			envs: {
				NO_NETWORK: 'PayPalEnvironmentNoNetwork',
				SANDBOX: 'PayPalEnvironmentSandbox',
				PRODUCTION: 'PayPalEnvironmentProduction'
			}
		};
	}

	static get googleApiKeyJs() {
		// return 'AIzaSyCHTb_dsSrhT6gyg4CiZK2qqk4pPqdkp00'
		return ''
	}

	static get oneSignalAppId() {
		return '1b08fbf6-5b08-47fe-a0dc-a4b3475e6475'
	}

	static get googleProjectNumber() {
		return '832343732593'
	}

	static get mapMarkers() {
		return {
			img: {
				car: 'www/assets/images/map/car.png',
				pin: 'www/assets/images/map/pin.png',
				position: 'www/assets/images/map/position.png',
				drop: 'www/assets/images/map/drop.png',
				pickup: 'www/assets/images/map/pickup.PNG'
			}
		};
	}
	static get pushTypes() {
		return {
			NEW_TRACKING: 'new-tracking',
			ACCEPTED_TRACKING: 'accept-tracking',
			ARRIVED_AGENT: 'arrived-agent',
			PICKUP_TRACKING: 'pickup-tracking',
			COMPLETED_TRIP: 'completed-trip',
			CANCELED_TRACKING: 'canceled-tracking',
		};
	}

	static get trackginStatus() {
		return {
			PENDING: 'pending',
			ONGOING: 'ongoing',
			PICKUP: 'pickup',
			COMPLETED: 'completed',
			CANCELED: 'canceled',
			ARRIVED: 'arrived',
			ARRIVED_DROP: 'arrived-drop',
		};
	}
}
