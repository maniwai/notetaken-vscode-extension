// extension.ts
import * as vscode from 'vscode';
import { TreeView } from './app/TreeView';
import { TreeDataProvider } from './app/TreeDataProvider';

let customTreeView: TreeView | undefined;

export function activate(context: vscode.ExtensionContext) {
  // Create the TreeDataProvider
  const treeDataProvider = new TreeDataProvider();
  // Register the Tree View with the TreeDataProvider
  vscode.window.registerTreeDataProvider('xTreeViewActivity', treeDataProvider);

  // Create and activate the Custom View
  customTreeView = new TreeView(context, treeDataProvider);

  // Register the "Hello World" command
  const helloWorldCommand = vscode.commands.registerCommand('extension.s01HelloWorld', () => {
    vscode.window.showInformationMessage('Hello, World!');
  });

  // Add the command to the context so that it can be disposed when the extension is deactivated
  context.subscriptions.push(helloWorldCommand);
}

export function deactivate() {
  // Dispose of the TreeView when the extension is deactivated
  if (customTreeView) {
    customTreeView.dispose();
  }
}
