import { AuthService } from './providers/auth.service';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule()
export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService
			]
		};
	}
}
