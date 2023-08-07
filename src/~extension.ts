// extension.ts
import * as vscode from 'vscode';
import { X01OutlineProvider } from './app/X01OutlineProvider';

export function activate(context: vscode.ExtensionContext) {
  //
  const x01OutlineProvider = new X01OutlineProvider();

  vscode.window.createTreeView('x01Outline', {
    treeDataProvider: x01OutlineProvider,
    showCollapseAll: true,
  });

  vscode.commands.registerCommand('x01Outline.renameNode', (offset) => x01OutlineProvider.rename(offset));
}
