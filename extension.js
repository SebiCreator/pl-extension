const vscode = require('vscode');
const io = require('socket.io-client');



/**
 * @param {vscode.ExtensionContext} context
 */

let socket = null
let messageSent = false;
const socketUrl = 'http://localhost:3000';
function activate(context) {

	console.log('pl-extension is now active!');

	let helloWorld = vscode.commands.registerCommand('pl-extension.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from !');
		console.log(vscode.window.activeTextEditor.document.getText());
	});

	let connect = vscode.commands.registerCommand('pl-extension.connect', function () {
		vscode.window.showInformationMessage('Verbindung zum Server wird hergestellt...');
		socket = io.connect(socketUrl);

		socket.on('connect', () => {
			vscode.window.showInformationMessage('Verbindung zum Server hergestellt!');
		});

		socket.on('connect_error', (error) => {
			vscode.window.showErrorMessage('Verbindungsfehler:\t' + error.message);
		});

		socket.on('disconnect', () => {
			vscode.window.showWarningMessage('Verbindung zum Server getrennt!');
		});

		socket.on('messageToExtension', (text) => {
			if(messageSent) {
				messageSent = false;
				return
			}
            updateTextEditor(text);
        });

		socket.emit('newText', 'Hello from VS Code!');
	});

	let onTypeListener = vscode.workspace.onDidChangeTextDocument((event) => {
		const text = vscode.window.activeTextEditor.document.getText();
        if (socket && socket.connected) {
            socket.emit('messageFromExtension', text);
			messageSent = true;
        } else {
			console.log('socket not connected')
			vscode.window.showErrorMessage('Socket not connected');
		}
    });

    context.subscriptions.push(helloWorld, connect, onTypeListener);

}

// This method is called when your extension is deactivated
function deactivate() { }

function updateTextEditor(data) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const fullRange = new vscode.Range(
            document.positionAt(0), // Start an der ersten Position
            document.lineAt(document.lineCount - 1).range.end // Bis zum Ende des letzten Texts
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, data); // Ersetzt den gesamten Inhalt durch 'data'
        }).then(success => {
            if (success) {
                console.log('Text updated');
            } else {
                console.log('Failed to update text');
            }
        }, reason => {
            console.error('Failed to update text:', reason);
            vscode.window.showErrorMessage('Failed to update text');
        });
    } else {
        vscode.window.showErrorMessage('No active text editor');
    }
}


module.exports = {
	activate,
	deactivate
}
