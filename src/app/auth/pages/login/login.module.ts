import { AuthModule } from './../../auth.module';
import { CommonModule } from './../../../common/common.module';
import { LoginPage } from './login';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [
		LoginPage,
	],
	imports: [
		IonicPageModule.forChild(LoginPage),
		CommonModule,
		AuthModule.forRoot()
	],
	exports: [
		LoginPage
	]
})
export class LoginPageModule { }
