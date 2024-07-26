import * as vscode from 'vscode';
import { DebuggerType } from './configurations';
import { DebugConfigurationProvider } from './configurationProvider';
import { LdbgDebugAdapterDescriptorFactory } from './debugAdapterDescriptorFactory';

const disposables: vscode.Disposable[] = [];

export async function initialize(context: vscode.ExtensionContext): Promise<void> {
    const ldbgProvider: DebugConfigurationProvider = new DebugConfigurationProvider(DebuggerType.ldbg);
    disposables.push(vscode.debug.registerDebugConfigurationProvider(DebuggerType.ldbg, ldbgProvider, vscode.DebugConfigurationProviderTriggerKind.Dynamic));

    // Register Debug Adapters
    disposables.push(vscode.debug.registerDebugAdapterDescriptorFactory(DebuggerType.ldbg, new LdbgDebugAdapterDescriptorFactory(context)));

    // Register DebugConfigurationProviders for "Run and Debug" play button.
    disposables.push(vscode.commands.registerTextEditorCommand("elena.BuildAndDebugFile", async (textEditor: vscode.TextEditor, _edit: vscode.TextEditorEdit, ..._args: any[]) => { await ldbgProvider.buildAndDebug(textEditor); }));
    disposables.push(vscode.commands.registerTextEditorCommand("elena.BuildAndRunFile", async (textEditor: vscode.TextEditor, _edit: vscode.TextEditorEdit, ..._args: any[]) => { await ldbgProvider.buildAndRun(textEditor); }));
}

export function dispose(): void {
    disposables.forEach(d => d.dispose());
}
