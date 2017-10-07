import { Component, Input } from '@angular/core';

@Component({
	selector: 'cs-spinner',
	template: `
		<img [src]="path" />
    `
})
export class CsSpinnerComponent {
	@Input('data') data: any;
	path: string;

	constructor() { }

	ngAfterViewInit() {
		this.path = "assets/svg/" + this.data + ".svg";
	}

	getData = (): any => {
		return this.data;
	}
}
