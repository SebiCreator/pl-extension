import * as vscode from 'vscode';

console.log("Hello World")

const sendUpdateToServer = () => {

}

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "pl-extension" is now active!');

	let disposable = vscode.commands.registerCommand('pl-extension.helloWorld', () => {
		const window = vscode.window
		window.showInformationMessage('Hello World from pl-extension!');
		console.log("Hello World from pl-extension")
		const editor = window.activeTextEditor
		if (!editor) {
			window.showInformationMessage('No active text editor')
			console.log('No active text editor')	
			return
		}
		console.log('Active text editor')
		const filename = editor.document.fileName
		const code = editor.document.getText()
		console.log({ filename, code })
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
