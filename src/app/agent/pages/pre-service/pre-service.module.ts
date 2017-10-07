import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreServicePage } from "./pre-service";

@NgModule({
	declarations: [
		PreServicePage
	],
	imports: [
		IonicPageModule.forChild(PreServicePage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
