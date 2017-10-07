import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicePage } from "./service";

@NgModule({
	declarations: [
		ServicePage
	],
	imports: [
		IonicPageModule.forChild(ServicePage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
