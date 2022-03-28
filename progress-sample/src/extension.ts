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

			const USE_FOR_LOOP = false;

			if (USE_FOR_LOOP) {
				const MAX_NUMBER_OF_REPITITIONS: number = 100;

				for (
					let numberOfRepititions = 1;
					numberOfRepititions <= MAX_NUMBER_OF_REPITITIONS;
					numberOfRepititions++
				) {
					await DOWNLOAD();
					const increment = numberOfRepititions;
					progress.report({
						increment,
						message: increment.toString()
					});
				}
			} else {
				let increment = 0;
				progress.report({
					increment,
					message: increment.toString()
				});

				increment = 10;
				progress.report({
					increment,
					message: increment.toString()
				});

				await DOWNLOAD();
				increment = 40;
				progress.report({
					increment,
					message: increment.toString()
				});

				await DOWNLOAD();
				increment = 50;
				progress.report({
					increment,
					message: increment.toString()
				});
			}

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
