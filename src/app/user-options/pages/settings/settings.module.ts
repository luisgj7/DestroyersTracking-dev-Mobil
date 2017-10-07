import { AuthModule } from './../../../auth/auth.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { CommonModule } from './../../../common/common.module';

@NgModule({
	declarations: [
		SettingsPage,
	],
	imports: [
		IonicPageModule.forChild(SettingsPage),
		CommonModule,
		AuthModule.forRoot()
	],
	exports: [
		SettingsPage
	]
})
export class SettingsPageModule { }
