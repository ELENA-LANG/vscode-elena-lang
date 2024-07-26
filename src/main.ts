import * as vscode from 'vscode';
import * as DebuggerExtension from './Debugger/extension';

/**
 * This method is called when the extension is activated.
 * @param context The extension context
 */
export async function activate(context: vscode.ExtensionContext) : Promise<void> {
    let output = vscode.window.createOutputChannel("elena");
    output.appendLine("Starting ELENA vscode extension..");

    // Initialize the DebuggerExtension and register the related commands and providers.
    await DebuggerExtension.initialize(context);	
}

export function deactivate(): void {
    DebuggerExtension.dispose();
}
