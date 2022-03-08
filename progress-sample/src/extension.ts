/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands, ProgressLocation } from 'vscode';

import DOWNLOAD from './download';

export function activate(context: ExtensionContext) {
		window.withProgress({
			location: ProgressLocation.Notification,
			title: "I am long running!",
			cancellable: true
		}, async (progress, token) => {
			token.onCancellationRequested(() => {
				console.log("User canceled the long running operation");
			});

			progress.report({ increment: 0 });

			await DOWNLOAD();
			progress.report({ increment: 10, message: "I am long running! - still going..." });

			await DOWNLOAD();
			progress.report({ increment: 40, message: "I am long running! - still going even more..." });

			await DOWNLOAD();
			progress.report({ increment: 50, message: "I am long running! - almost there..." });

			const p = new Promise<void>(async resolve => {
					console.info('about to download', new Date().toLocaleTimeString());
					await DOWNLOAD();
					console.info('finished download', new Date().toLocaleTimeString());
					resolve();
					console.info('finished resolve?', new Date().toLocaleTimeString());
			});

			return p;
		});
}
