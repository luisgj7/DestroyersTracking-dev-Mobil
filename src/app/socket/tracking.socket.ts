import { EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { ConfigService } from './../core/config.service';

export class TrackingSocket {

	static socket: any;
	static interval: any;
	static userId: any;

	static init(): any {

		let baseUrl: string = new ConfigService().BASE_URL;

		let trackingNsp = 'tracking';
		TrackingSocket.socket = io(baseUrl + trackingNsp);
		return this;
	}

	static addUser(userId: string): any {
		this.userId = userId;
		TrackingSocket.socket.emit('add-user', userId);
		return this;
	}

	static setDropTracking(payload): any {
		payload.type = 'set-drop-tracking'
		TrackingSocket.socket.emit('set-drop-tracking', payload);
		return this;
	}

	static removeUser(userId: string): void {
		TrackingSocket.socket.emit('disconnect-user', userId);
	}

	static updatePosition(payload): any {
		if (this.userId) TrackingSocket.socket.emit('update-position', payload);
	}

	static setListeners(): any {

		TrackingSocket.socket.on('new-tracking', payload => TrackingAction.emit(payload));
		TrackingSocket.socket.on('accepted-tracking', payload => TrackingAction.emit(payload));
		TrackingSocket.socket.on('arrived-agent', payload => TrackingAction.emit(payload));
		TrackingSocket.socket.on('pickup-tracking', payload => TrackingAction.emit(payload));
		TrackingSocket.socket.on('update-position-tracking', payload => TrackingAction.emit(payload));
		TrackingSocket.socket.on('completed-tracking', payload => TrackingAction.emit(payload));
		TrackingSocket.socket.on('canceled-tracking', payload => TrackingAction.emit(payload));

		TrackingSocket.socket.on('connect', () => {
			console.log('Connect Socket.io');
		});
		TrackingSocket.socket.on('disconnect', () => {
			console.log('disconnet Socket.io')
			this.interval = setInterval(() => {
				this.reconnect();
			}, 500);
		});
		TrackingSocket.socket.on('reconnect', () => {
			console.log('ReConnect Socket.io');
			this.addUser(this.userId);
			clearInterval(this.interval);
		});

		return this;
	}

	static reconnect() {
		TrackingSocket.socket.io.reconnect();
	}

}
export class TrackingAction {

	static subscriber: EventEmitter<any>;

	static init() {
		this.subscriber = new EventEmitter<any>();
		return TrackingAction;
	}

	static emit(data: any): void {
		this.subscriber.next(data);
	}

}
