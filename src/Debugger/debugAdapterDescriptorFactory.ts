import * as vscode from "vscode";

abstract class AbstractDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
    protected readonly context: vscode.ExtensionContext;
    protected output: vscode.OutputChannel;

    // This is important for the Mock Debugger since it can not use src/common
    constructor(context: vscode.ExtensionContext, output: vscode.OutputChannel) {
        this.context = context;
        this.output = output;
    }

    abstract createDebugAdapterDescriptor(session: vscode.DebugSession, executable?: vscode.DebugAdapterExecutable): vscode.ProviderResult<vscode.DebugAdapterDescriptor>;
}

export class LdbgDebugAdapterDescriptorFactory extends AbstractDebugAdapterDescriptorFactory {
    async createDebugAdapterDescriptor(_session: vscode.DebugSession, executable?: vscode.DebugAdapterExecutable): Promise<vscode.DebugAdapterDescriptor> {
        this.output.appendLine("createDebugAdapterDescriptor");

	// param "executable" contains the executable optionally specified in the package.json (if any)

        // use the executable specified in the package.json if it exists or determine it based on some other information (e.g. the session)
//        if (!executable) {
            const command = "C:/Alex/elena-lang/bin/elena-dpa.exe";
            const args = [
               "some args",
               "another arg"
            ];
            const options = {
               cwd: "C:/Alex/elena-lang/tests60/sandbox",
               env: { "envVariable": "some value" }
            };
            executable = new vscode.DebugAdapterExecutable(command, args, options);
//        }

        this.output.appendLine(`    returning ${JSON.stringify(executable)}`); 

        // make VS Code launch the DA executable
        return executable;
    }
}