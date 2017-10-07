import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnGoingPage } from "./ongoing";

@NgModule({
	declarations: [
		OnGoingPage
	],
	imports: [
		IonicPageModule.forChild(OnGoingPage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
