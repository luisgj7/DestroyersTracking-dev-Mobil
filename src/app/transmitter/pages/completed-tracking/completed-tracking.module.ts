import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinishTrackingPage } from "./completed-tracking";

@NgModule({
	declarations: [
		FinishTrackingPage
	],
	imports: [
		IonicPageModule.forChild(FinishTrackingPage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
