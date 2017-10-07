import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingPage } from "./tracking";

@NgModule({
	declarations: [
		TrackingPage
	],
	imports: [
		IonicPageModule.forChild(TrackingPage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
