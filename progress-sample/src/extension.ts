/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands, ProgressLocation } from 'vscode';

import DOWNLOAD from './download';

export function activate(context: ExtensionContext) {
		window.withProgress({
			location: ProgressLocation.Notification,
			cancellable: true
		}, async (progress, token) => {
			token.onCancellationRequested(() => {
				console.log("User canceled the long running operation");
			});

			const MAX_NUMBER_OF_REPITITIONS: number = 100;
			let cumulativeTotal = 0;

			for (
				let numberOfRepititions = 0;
				numberOfRepititions <= MAX_NUMBER_OF_REPITITIONS;
				numberOfRepititions += 10
			) {
				await DOWNLOAD();
				const increment = numberOfRepititions;
				cumulativeTotal += increment;

				progress.report({
					increment,
					message: 'increment: ' +
						increment.toString() +
						' Cumulative total: ' +
						cumulativeTotal.toString()
				});
			}

			const promise = new Promise<void>(async (resolve) => {
					console.info('about to download', new Date().toLocaleTimeString());

					await DOWNLOAD();

					console.info('finished download', new Date().toLocaleTimeString());

					resolve();

					console.info('finished resolve?', new Date().toLocaleTimeString());
			});

			return promise;
		});
}
