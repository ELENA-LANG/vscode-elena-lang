import * as vscode from "vscode";

abstract class AbstractDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
    protected readonly context: vscode.ExtensionContext;

    // This is important for the Mock Debugger since it can not use src/common
    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    abstract createDebugAdapterDescriptor(session: vscode.DebugSession, executable?: vscode.DebugAdapterExecutable): vscode.ProviderResult<vscode.DebugAdapterDescriptor>;
}

export class LdbgDebugAdapterDescriptorFactory extends AbstractDebugAdapterDescriptorFactory {
    async createDebugAdapterDescriptor(_session: vscode.DebugSession, _executable?: vscode.DebugAdapterExecutable): Promise<vscode.DebugAdapterDescriptor> {
//        const adapter: string = "./debugAdapters/bin/OpenDebugAD7" + (os.platform() === 'win32' ? ".exe" : "");

        const command: string = /*path.join(this.context.extensionPath, adapter)*/"";

        return new vscode.DebugAdapterExecutable(command, []);
    }
}