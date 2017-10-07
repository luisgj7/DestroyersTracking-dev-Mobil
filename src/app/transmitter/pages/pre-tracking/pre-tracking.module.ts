import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreTrackingPage } from "./pre-tracking";

@NgModule({
	declarations: [
		PreTrackingPage
	],
	imports: [
		IonicPageModule.forChild(PreTrackingPage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
