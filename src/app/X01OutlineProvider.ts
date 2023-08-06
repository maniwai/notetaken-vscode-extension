// treeDataProvider.ts
import * as vscode from 'vscode';

export class X01OutlineProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
    if (!element) {
      // Top level items
      return Promise.resolve([this.getHelloItem('Hello,', 'string.svg'), this.getHelloItem('World!', 'string.svg')]);
    } else {
      // Child items (if any)
      return Promise.resolve([]);
    }
  }

  private getHelloItem(label: string, iconName: string): vscode.TreeItem {
    const item = new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.None);

    item.iconPath = new vscode.ThemeIcon(iconName);

    return item;
  }
  rename(offset: number): void {}
}
