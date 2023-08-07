import * as vscode from 'vscode';

interface TreeNode {
  label: string;
  children?: TreeNode[];
}

const treeData: TreeNode[] = [
  {
    label: 'Parent A',
    children: [
      {
        label: 'Child A1',
        children: [
          {
            label: 'Child A1-a',
          },
        ],
      },
    ],
  },
  {
    label: 'Parent B',
    children: [
      {
        label: 'Child B1',
        children: [
          {
            label: 'Child B1-a',
          },
        ],
      },
    ],
  },
];

class MyTreeDataProvider implements vscode.TreeDataProvider<TreeNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeNode | undefined> = new vscode.EventEmitter<
    TreeNode | undefined
  >();
  readonly onDidChangeTreeData: vscode.Event<TreeNode | undefined> =
    this._onDidChangeTreeData.event;

  constructor(private treeData: TreeNode[]) {}

  getTreeItem(element: TreeNode): vscode.TreeItem {
    return new vscode.TreeItem(
      element.label,
      element.children
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.None
    );
  }

  getChildren(element?: TreeNode): vscode.ProviderResult<TreeNode[]> {
    try {
      if (!element) {
        // If element is not provided, return the root elements
        return Promise.resolve(this.treeData);
      }

      // Simulate an asynchronous operation
      return new Promise<TreeNode[]>((resolve) => {
        setTimeout(() => {
          resolve(element.children ?? []);
        }, 1000); // Simulate a 1-second delay
      });
    } catch (err) {
      console.error('Error getting children:', err);
      return [];
    }
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined); // Pass undefined as the argument
  }
}

export function activate(context: vscode.ExtensionContext) {
  try {
    const treeDataProvider = new MyTreeDataProvider(treeData);

    // Register the tree view with the data provider
    vscode.window.createTreeView('x01Outline', { treeDataProvider });

    // Register a command to refresh the tree view
    context.subscriptions.push(
      vscode.commands.registerCommand('x01Outline.refreshTree', () => {
        treeDataProvider.refresh();
      })
    );
  } catch (err) {
    console.error('Error activating extension:', err);
  }
}

export function deactivate() {}
