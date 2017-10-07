import { AuthModule } from './../../auth.module';
import { CommonService } from './../../../core/common.service';
import { CommonModule } from './../../../common/common.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinPage } from './join';

@NgModule({
	declarations: [
		JoinPage,
	],
	imports: [
		IonicPageModule.forChild(JoinPage),
		CommonModule,
		AuthModule.forRoot()
	],
	exports: [
		JoinPage
	],
	providers: [
		CommonService
	]
})
export class JoinPageModule { }
