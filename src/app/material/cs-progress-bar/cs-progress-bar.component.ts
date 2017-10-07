import { Component, Input } from '@angular/core';

@Component({
	selector: 'cs-progress-bar',
	template: `
		<md-progress-bar
			*ngIf="show"
            class="margin"
            [color]="color"
            [mode]="mode"
            [value]="value"
            [bufferValue]="bufferValue">
      </md-progress-bar>
    `
})
export class CsProgressBarComponent {

    /**
     * Color of the progress bar.
     * primary accent warn
     */
	@Input() color: string = 'primary';
    /**
     * Value of the progressbar. Defaults to zero. Mirrored to aria-valuenow.
     */
	@Input() value: number;
    /**
     * Buffer value of the progress bar. Defaults to zero.
     */
	@Input() bufferValue: string;
    /**
     * Mode of the progress bar.
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to 'determinate'. Mirrored to mode attribute.
     */
	@Input() mode: string = 'indeterminate';
    /**
     * Show or hide view
     */
	@Input() show: any = true;
	constructor() {

	}

}
