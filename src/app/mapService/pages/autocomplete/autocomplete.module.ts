import { MaterialModule } from './../../../material/material.module';
import { CommonModule } from './.././../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompletePage } from "./autocomplete";

@NgModule({
	declarations: [
		AutocompletePage
	],
	imports: [
		IonicPageModule.forChild(AutocompletePage),
		MaterialModule,
		CommonModule
	],
	providers: [
	]
})
export class Module { }
