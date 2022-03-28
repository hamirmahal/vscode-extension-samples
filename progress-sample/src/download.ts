import { exec } from "child_process";

const PROCESS_HANDLE = (
    arg1: unknown,
    arg2: unknown,
    resolve: (value: unknown) => void,
    reject?: (reason?: any) => void
) => {
    console.info('arg1', arg1);
    console.info('arg2', arg2);
    reject ?
        reject('Error arg1 arg2' + arg1 + arg2) :
        resolve(arg1);
};

export default () => new Promise((resolve, reject) => {
    const curlCommand = 'curl https://github.com/' +
        'microsoft/vscode-extension-samples/tree/' +
        'main/progress-sample';

    const dockerDownloadCommand = 'docker pull postgres';

    // Change this to your liking.
    const youWantToTestThisUsingCurl = false;

    const command = youWantToTestThisUsingCurl ?
        curlCommand : dockerDownloadCommand;
    const process = exec(command);

    process.on('close', (arg1, arg2) => {
        console.info('close');
        PROCESS_HANDLE(arg1, arg2, resolve);
    });

    process.on('disconnect', (arg1: unknown, arg2: unknown) => {
        console.info('disconnect');
        PROCESS_HANDLE(arg1, arg2, resolve);
    });

    process.on('error', (arg1: unknown, arg2: unknown) => {
        console.info('error');
        PROCESS_HANDLE(arg1, arg2, resolve, reject);
    });

    process.on('exit', (arg1, arg2) => {
        console.info('exit');
        PROCESS_HANDLE(arg1, arg2, resolve);
    });

    process.on('message', (arg1, arg2) => {
        console.info('message');
        PROCESS_HANDLE(arg1, arg2, resolve);
    });
});