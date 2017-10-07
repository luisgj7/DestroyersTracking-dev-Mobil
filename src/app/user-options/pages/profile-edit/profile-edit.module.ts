import { AuthModule } from './../../../auth/auth.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from './../../../common/common.module';
import { ProfileEditPage } from './profile-edit';

@NgModule({
	declarations: [
		ProfileEditPage,
	],
	imports: [
		IonicPageModule.forChild(ProfileEditPage),
		CommonModule,
		AuthModule.forRoot()
	],
	exports: [
		ProfileEditPage
	]
})
export class ProfileEditPageModule { }
