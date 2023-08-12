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
}
