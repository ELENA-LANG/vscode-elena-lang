import * as vscode from 'vscode';
import * as commands from './commands';

const cmds : Array<[string, () => void]> = [
	[ 'elena.compileSingleFile', commands.compileSingleFile ]
];

/**
 * This method is called when the extension is activated.
 * @param context The extension context
 */
export function activate(context: vscode.ExtensionContext): void {
	for (var cmd of cmds) {
		const disposable = vscode.commands.registerCommand(cmd[0], cmd[1]);
		context.subscriptions.push(disposable);
	}
}

export function deactivate(): void {
}
