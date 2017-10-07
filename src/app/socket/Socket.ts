import { ICoords } from './../common/interfaces/common.interfaces';
import { TrackingSocket, TrackingAction } from './tracking.socket';
export class SocketService {
	constructor() {
	}

	static init(userId: string) {
		TrackingAction.init();
		TrackingSocket.init().addUser(userId).setListeners();
	}

	static updatePosition(payload: UpdatePosition) {
		TrackingSocket.updatePosition(payload);
	}
}

export interface UpdatePosition {
	coords: ICoords,
	trackingId: string
}
