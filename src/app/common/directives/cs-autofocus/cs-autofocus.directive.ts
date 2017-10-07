import { Directive, Renderer, ElementRef } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

@Directive({
	selector: '[csAutofocus]'
})
export class CsAutofocusDirective {

	constructor(
		private _renderer: Renderer,
		private _elementRef: ElementRef,
		private _keyboard: Keyboard
	) { }

	ngAfterViewInit() {
		const element = this._elementRef.nativeElement.querySelector('input');

		setTimeout(() => {
			this._renderer.invokeElementMethod(element, 'focus', []);
			this._keyboard.show();
		}, 0);
	}
}
