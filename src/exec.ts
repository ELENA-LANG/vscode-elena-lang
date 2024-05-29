import { window, Terminal } from 'vscode';
import { getExecCommand } from './utils';

let terminalWindow: Terminal = null;

export function compileInTerminal(args: string[]): void {
	const execFile = getExecCommand();
	const cmd = `${execFile} ${args.join(' ')}`;

	if (!terminalWindow) terminalWindow = window.createTerminal('ELENA');

	terminalWindow.show();
	terminalWindow.sendText(cmd);
}
