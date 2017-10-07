import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindingRequestPage } from "./finding-request";

@NgModule({
	declarations: [
		FindingRequestPage
	],
	imports: [
		IonicPageModule.forChild(FindingRequestPage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
