import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransitServicePage } from "./transit-service";

@NgModule({
	declarations: [
		TransitServicePage
	],
	imports: [
		IonicPageModule.forChild(TransitServicePage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
