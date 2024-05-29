import {
	workspace,
	WorkspaceConfiguration,
	window,
	Uri,
	WorkspaceFolder,
} from 'vscode';

const defaultCommand = 'elena-cli';

export function getWorkspaceFolder(uri?: Uri): WorkspaceFolder | undefined {
	if (uri) {
		return workspace.getWorkspaceFolder(uri);
	} else if (window.activeTextEditor && window.activeTextEditor.document) {
		return workspace.getWorkspaceFolder(window.activeTextEditor.document.uri);
	} else if (workspace.workspaceFolders) {
		return workspace.workspaceFolders[0];
	}
	return undefined;
}

export function getWorkspaceConfig(): WorkspaceConfiguration | undefined {
	const currentWorkspaceFolder = getWorkspaceFolder();
	if (currentWorkspaceFolder) {
		return workspace.getConfiguration('elena', currentWorkspaceFolder.uri);
	}
	return undefined;
}

export function getExecCommand(): string | undefined {
	const config: WorkspaceConfiguration | undefined = getWorkspaceConfig();
	return config?.get('elena.executablePath', defaultCommand);
}
