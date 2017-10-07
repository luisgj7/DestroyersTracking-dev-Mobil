import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartServicePage } from "./start-service";

@NgModule({
	declarations: [
		StartServicePage
	],
	imports: [
		IonicPageModule.forChild(StartServicePage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
