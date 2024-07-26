import * as vscode from 'vscode';
import { DebuggerType } from './configurations';
import { DebugConfigurationProvider } from './configurationProvider';
import { LdbgDebugAdapterDescriptorFactory } from './debugAdapterDescriptorFactory';

const disposables: vscode.Disposable[] = [];

export async function initialize(context: vscode.ExtensionContext, output: vscode.OutputChannel): Promise<void> {
    output.appendLine("Debugger.initialize");

    const ldbgProvider: DebugConfigurationProvider = new DebugConfigurationProvider(DebuggerType.ldbg, output);
    disposables.push(vscode.debug.registerDebugConfigurationProvider(DebuggerType.ldbg, ldbgProvider));

    // Register Debug Adapters
    disposables.push(vscode.debug.registerDebugAdapterDescriptorFactory(DebuggerType.ldbg, new LdbgDebugAdapterDescriptorFactory(context, output)));

    // Register DebugConfigurationProviders for "Run and Debug" play button.
    disposables.push(vscode.commands.registerTextEditorCommand("elena.BuildAndDebugFile", async (textEditor: vscode.TextEditor, _edit: vscode.TextEditorEdit, ..._args: any[]) => { await ldbgProvider.buildAndDebug(textEditor); }));
    disposables.push(vscode.commands.registerTextEditorCommand("elena.BuildAndRunFile", async (textEditor: vscode.TextEditor, _edit: vscode.TextEditorEdit, ..._args: any[]) => { await ldbgProvider.buildAndRun(textEditor); }));
}

export function dispose(): void {
    disposables.forEach(d => d.dispose());
}
