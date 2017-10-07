import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DenyPage } from "./deny";

@NgModule({
	declarations: [
		DenyPage
	],
	imports: [
		IonicPageModule.forChild(DenyPage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
