import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinishServicePage } from "./finish-service";

@NgModule({
	declarations: [
		FinishServicePage
	],
	imports: [
		IonicPageModule.forChild(FinishServicePage),
		CommonModule
	],
	providers: [
	]
})
export class Module { }
