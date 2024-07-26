import * as vscode from 'vscode';
import { DebuggerType, LDebugConfiguration } from './configurations';

export class DebugConfigurationProvider implements vscode.DebugConfigurationProvider {
    private type: DebuggerType;

    public constructor(type: DebuggerType) {
        this.type = type;
    }

    async provideDebugConfigurations(folder?: vscode.WorkspaceFolder, token?: vscode.CancellationToken): Promise<LDebugConfiguration[]> {
        return [];
    }

    async resolveDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, config: LDebugConfiguration, _token?: vscode.CancellationToken): Promise<LDebugConfiguration | null | undefined> {
        return undefined;
    }

    async resolveDebugConfigurationWithSubstitutedVariables(folder: vscode.WorkspaceFolder | undefined, config: LDebugConfiguration, token?: vscode.CancellationToken): Promise<LDebugConfiguration | null | undefined> {
        return undefined;
    }

    public async buildAndDebug(textEditor: vscode.TextEditor, debugModeOn: boolean = true): Promise<void> {
    }

    public async buildAndRun(textEditor: vscode.TextEditor): Promise<void> {
        return this.buildAndDebug(textEditor, false);
    }
}