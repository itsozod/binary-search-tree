class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class binarySearchTree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  isEmpty() {
    return this.root === null;
  }
  sortAndRemoveDubs(array) {
    const sorted = array.sort((a, b) => a - b);
    const removedDublicates = sorted.filter(
      (value, index) => sorted.indexOf(value) === index
    );
    return removedDublicates;
  }
  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    const mid = parseInt(array.length / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));
    return root;
  }
  insert(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (newNode.data < root.data) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }
  findValue(root, value) {
    if (!root) {
      return false;
    } else {
      if (root.data === value) {
        return true;
      } else if (value < root.data) {
        return this.findValue(root.left, value);
      } else {
        return this.findValue(root.right, value);
      }
    }
  }
  max(root) {
    if (!root.right) {
      return root.value;
    } else {
      return this.min(root.right);
    }
  }
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root.data === null) {
      return root;
    } else if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      } else {
        root.value = this.max(root.right);
        root.right = this.deleteNode(root.right, root.value);
      }
    }
    return root;
  }

  // level order traversal (breadth first search) first visits root then left then right
  // BFS
  levelOrderTraversal() {
    if (!this.root) {
      return [];
    }
    let result = [];
    let queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return result;
  }

  // DFS
  // preorder traversal first reads the data of the root node then left then right
  preorderTraversal(root, result = []) {
    if (root) {
      result.push(root.data);
      this.preorderTraversal(root.left, result);
      this.preorderTraversal(root.right, result);
    }
    return result;
  }

  // inorder traversal first visits left then root node then right
  inOrderTraversal(root, result = []) {
    if (root) {
      this.inOrderTraversal(root.left, result);
      result.push(root.data);
      this.inOrderTraversal(root.right, result);
    }
    return result;
  }

  // post order traversal first visits left then right then the root node

  postOrderTraversal(root, result = []) {
    if (root) {
      this.postOrderTraversal(root.left, result);
      this.postOrderTraversal(root.right, result);
      result.push(root.data);
    }
    return result;
  }
}

const array = [2, 3];

const tree = new binarySearchTree(array);
console.log("Is it empty?", tree.isEmpty());
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(7);

console.log(tree.levelOrderTraversal(tree.root)); //[ 3, 2, 10, 5, 15, 7 ]
console.log(tree.preorderTraversal(tree.root)); // [ 3, 2, 10, 5, 7, 15 ]
console.log(tree.inOrderTraversal(tree.root)); // [ 2, 3, 5, 7, 10, 15 ]
console.log(tree.postOrderTraversal(tree.root)); // [ 2, 7, 5, 15, 10, 3 ]
console.log(tree.min(tree.root)); // 2
console.log(tree.max(tree.root)); // 15
