import { MdProgressBarModule, MdProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CsProgressSpinnerComponent } from './cs-progress-spinner/cs-progress-spinner.component';
import { CsProgressBarComponent } from './cs-progress-bar/cs-progress-bar.component';

@NgModule({
	imports: [
		CommonModule,
		MdProgressBarModule,
		MdProgressSpinnerModule
	],
	declarations: [
		CsProgressBarComponent,
		CsProgressSpinnerComponent
	],
	exports: [
		MdProgressBarModule,
		MdProgressSpinnerModule,

		CsProgressBarComponent,
		CsProgressSpinnerComponent,
	]
})
export class MaterialModule { }
