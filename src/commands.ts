import * as vscode from 'vscode';
import { window } from 'vscode';
import { compileInTerminal } from './exec';
import { getProjectFile } from './utils';

export async function compileSingleFile(): Promise<void> {
	const document : vscode.TextDocument | undefined = window?.activeTextEditor?.document;
	if (document) {
		await document.save();
		const filePath = `"${document.fileName}"`;

		compileInTerminal([filePath]);
	}
}

export async function compileProject(): Promise<void> {
	const projectFile : vscode.Uri | undefined = await getProjectFile();
	if (projectFile) {
		const filePath = `"${projectFile.fsPath}"`;

		compileInTerminal([filePath]);
	}
}
