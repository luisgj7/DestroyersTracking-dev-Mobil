import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindingPage } from "./finding";

@NgModule({
	declarations: [
		FindingPage
	],
	imports: [
		IonicPageModule.forChild(FindingPage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
