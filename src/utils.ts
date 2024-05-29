import {
	workspace,
	WorkspaceConfiguration,
	window,
	Uri,
	WorkspaceFolder,
} from 'vscode';

const defaultCommand = 'elena-cli';

export function getWorkspaceFolder(uri?: Uri): WorkspaceFolder {
	if (uri) {
		return workspace.getWorkspaceFolder(uri);
	} else if (window.activeTextEditor && window.activeTextEditor.document) {
		return workspace.getWorkspaceFolder(window.activeTextEditor.document.uri);
	} else {
		return workspace.workspaceFolders[0];
	}
}

export function getWorkspaceConfig(): WorkspaceConfiguration {
	const currentWorkspaceFolder = getWorkspaceFolder();
	return workspace.getConfiguration('elena', currentWorkspaceFolder.uri);
}

export function getExecCommand(): string {
	const config = getWorkspaceConfig();
	return config.get('elena.executablePath', defaultCommand);
}
