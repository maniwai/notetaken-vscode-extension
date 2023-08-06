// treeView.ts
import * as vscode from 'vscode';
import { X01OutlineProvider } from './X01OutlineProvider';

export class TreeView implements vscode.Disposable {
  private treeView: vscode.TreeView<vscode.TreeItem>;
  private treeDataProvider: X01OutlineProvider;

  constructor(context: vscode.ExtensionContext, treeDataProvider: X01OutlineProvider) {
    this.treeDataProvider = treeDataProvider;
    this.treeView = vscode.window.createTreeView('x01TreeView', {
      treeDataProvider: this.treeDataProvider
    });

    context.subscriptions.push(this.treeView);
  }

  dispose() {
    this.treeView.dispose();
  }

  getView(): vscode.TreeView<vscode.TreeItem> {
    return this.treeView;
  }
}
