import * as vscode from 'vscode';
import { window } from 'vscode';
import { compileInTerminal } from './exec';

export async function compileSingleFile(): Promise<void> {
	const document : vscode.TextDocument | undefined = window?.activeTextEditor?.document;
	if (document) {
		await document.save();
		const filePath = `"${document.fileName}"`;

		compileInTerminal([filePath]);
	}
}
