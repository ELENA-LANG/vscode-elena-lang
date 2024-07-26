import * as vscode from 'vscode';
import { DebuggerType, LDebugConfiguration } from './configurations';

export class DebugConfigurationProvider implements vscode.DebugConfigurationProvider {
    private type: DebuggerType;
    private output: vscode.OutputChannel;

    public constructor(type: DebuggerType, output: vscode.OutputChannel) {
        this.type = type;
        this.output = output;
    }

    async resolveDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, config: LDebugConfiguration, token?: vscode.CancellationToken): Promise<LDebugConfiguration | null | undefined> {
        this.output.appendLine("resolveDebugConfiguration");

        // if launch.json is missing or empty
        if (!config.type && !config.request && !config.name) {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'elena') {
                config.type = DebuggerType.ldbg;
                config.name = 'Launch';
                config.request = 'launch';
                config.program = '${file}';
            }
        }

        if (!config.program) {
            return vscode.window.showInformationMessage("Cannot find a program to debug").then(_ => {
                return undefined;	// abort launch
            });
        }

        return config;
    }

    public async buildAndDebug(textEditor: vscode.TextEditor, debugModeOn: boolean = true): Promise<void> {
        this.output.appendLine("buildAndDebug");
    }

    public async buildAndRun(textEditor: vscode.TextEditor): Promise<void> {
        this.output.appendLine("buildAndRun");

        return this.buildAndDebug(textEditor, false);
    }
}