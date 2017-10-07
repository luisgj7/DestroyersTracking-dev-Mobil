import { Injectable } from '@angular/core';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class FileTransferService {

	private fileTransfer: FileTransferObject;

	constructor(
		private _transfer: FileTransfer,
	) {
		this.fileTransfer = this._transfer.create();
	}

}
