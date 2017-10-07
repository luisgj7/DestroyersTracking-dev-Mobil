import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
	selector:'[csHeaderTransparent]'
})

export class CsHeaderTransparentDirective {

	@Input('csHeaderTransparent') content: any;
	@Input('offset') offset: number;

	constructor(
		private _elementRef: ElementRef,
		private _renderer: Renderer
	) { }

	ngAfterViewInit():void {
		try {
			if (this.content) {
				let primary = '#009688';
				let transparent = 'linear-gradient(to top, transparent, rgba(0, 0, 0, .7))';
				this._renderer.setElementStyle(this._elementRef.nativeElement.querySelector('.toolbar .toolbar-background'), 'background',transparent);

				if (this.offset){
					this.content.ionScroll.subscribe(event => {
						let color = (event.getScrollTop > this.offset)  ? primary : transparent;
						this._renderer.setElementStyle(this._elementRef.nativeElement.querySelector('.toolbar .toolbar-background'), 'background', color);
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
}
