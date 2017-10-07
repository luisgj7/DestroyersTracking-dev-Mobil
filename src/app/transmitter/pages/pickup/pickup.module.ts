import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickUpPage } from "./pickup";

@NgModule({
	declarations: [
		PickUpPage
	],
	imports: [
		IonicPageModule.forChild(PickUpPage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
