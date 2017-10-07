import { Component, Input } from '@angular/core';

@Component({
	selector: 'cs-progress-spinner',
	template: `
        <md-progress-spinner
            class="margin"
            [color]="'accent'"
            [mode]="mode"
            [value]="value"
            [strokeWidth]="strokeWidth"
			[ngStyle]="{'width.px': size}"
			[ngClass]="[color, position, show?'':'fade-out']">
      </md-progress-spinner>
    `
})
export class CsProgressSpinnerComponent {

    /**
     * Stroke width of the progress spinner.
	 * By default uses 10px as stroke width.
     */
	@Input() strokeWidth: number = 10;
    /**
     * Color of the progress bar.
     * System variables
     */
	@Input() color: string = 'primary';
    /**
     * Value of the progressbar. Defaults to zero. Mirrored to aria-valuenow.
     */
	@Input() value: number;
    /**
     * Mode of the progress bar.
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to 'determinate'. Mirrored to mode attribute.
     */
	@Input() mode: string = 'indeterminate';
    /**
     * Show or hide view
     */
	@Input() show: any = true;
	/**
     * Spinner size min: 0 - max: 100 px
     */
	@Input() size: number = 50;
	/**
     * Spinner position: left - center - right
     */
	@Input() position: string = '';

	constructor() { }

}
