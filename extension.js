const vscode = require('vscode');
const io = require('socket.io-client');



/**
 * @param {vscode.ExtensionContext} context
 */

let socket = null
let isChanging = false;
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
			socket.emit('messageFromExtension', extractCodeBetweenMarkers(vscode.window.activeTextEditor.document.getText()))
		});

		socket.on('connect_error', (error) => {
			vscode.window.showErrorMessage('Verbindungsfehler:\t' + error.message);
		});

		socket.on('disconnect', () => {
			vscode.window.showWarningMessage('Verbindung zum Server getrennt!');
		});

		socket.on('messageToExtension', (text) => {
			
            updateTextEditor(text);
        });

	});

	let onTypeListener = vscode.workspace.onDidChangeTextDocument((event) => {
		const text = vscode.window.activeTextEditor.document.getText();
        if (socket && socket.connected && !isChanging) {
            socket.emit('messageFromExtension', extractCodeBetweenMarkers(text));
        } else {
			console.log('socket not connected')
			vscode.window.showErrorMessage('Socket not connected');
		}
    });

    context.subscriptions.push(helloWorld, connect, onTypeListener);

}

function deactivate() { }

function updateTextEditor(data) {
	isChanging = true;
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const fullRange = new vscode.Range(
            document.positionAt(0), 
            document.lineAt(document.lineCount - 1).range.end 
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, data); 
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
	isChanging = false;
}

function extractCodeBetweenMarkers(code) {
    const regex = /pl-start.*?([\s\S]*?)\s*pl-end/;
  
    const match = code.match(regex);

    if (match && match[1]) {
        return match[1].trim().slice(0,-1); 
    } else {
        return null; 
    }
}


module.exports = {
	activate,
	deactivate
}
