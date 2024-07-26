import * as vscode from 'vscode';

export enum DebuggerType {
    ldbg = "ldbg",
}

export interface LDebugConfiguration extends vscode.DebugConfiguration {
}