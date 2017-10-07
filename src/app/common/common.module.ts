import { DiagnosticService } from './providers/native/diagnostic.service';
import { AutocompleteService } from './providers/google/autocomplete.service';
import { TrackingService } from './providers/data/tracking.service';
import { ContactsService } from './providers/native/contacts.service';
import { GeolocationService } from './providers/native/geolocation.service';
import { MapService } from './providers/data/map.service';
import { FileTransferService } from './providers/native/file-transfer.service';
import { FormatterService } from './providers/utils/formatter.service';
import { GoogleMapService } from './providers/native/google-map.service';
import { MediaService } from './providers/native/media.service';
import { CameraService } from './providers/native/camera.service';
import { CsSelectImageDirective } from './directives/cs-select-image/cs-select-image.directive';
import { UserService } from './providers/data/user.service';
import { Toast } from '@ionic-native/toast';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PlatformMonitorService } from './providers/native/platform-monitor.service';
import { ToastrService } from './providers/native/toastr.service';
import { CsAutofocusDirective } from './directives/cs-autofocus/cs-autofocus.directive';
import { CsHeaderTransparentDirective } from './directives/cs-header-transparent/cs-header-transparent.directive';

import { CsSpinnerComponent } from './components/cs-spinner/cs-spinner.component';

@NgModule({
	imports: [],
	declarations: [
		// pipes

		// Directives
		CsAutofocusDirective,
		CsHeaderTransparentDirective,
		CsSelectImageDirective,

		// Components
		CsSpinnerComponent
	],
	providers: [
		UserService,

		PlatformMonitorService,
		ToastrService,
		Toast,
		CameraService,
		MediaService,
		FormatterService,
		FileTransferService,
		GoogleMapService,
		MapService,
		GeolocationService,
		ContactsService,
		TrackingService,

		AutocompleteService,
		DiagnosticService
	],
	exports: [
		IonicModule,
		CsHeaderTransparentDirective,
		CsSpinnerComponent
	]
})
export class CommonModule { }
