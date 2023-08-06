// treeView.ts
import * as vscode from 'vscode';
import { TreeDataProvider } from './TreeDataProvider';

export class TreeView implements vscode.Disposable {
  private treeView: vscode.TreeView<vscode.TreeItem>;
  private treeDataProvider: TreeDataProvider;

  constructor(context: vscode.ExtensionContext, treeDataProvider: TreeDataProvider) {
    this.treeDataProvider = treeDataProvider;
    this.treeView = vscode.window.createTreeView('xTreeViewActivity', {
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
