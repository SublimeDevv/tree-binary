function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype = {
  //contructor
  constructor: BinarySearchTree,

  add: function (value) {
    //Crea un nuevo nodo y se le asigna un valor
    var node = {
      value: value,
      left: null,
      right: null,
    };

    var current;
    //Cuando no hay nodos en el árbol
    if (this.root === null) {
      this.root = node;
    } else {
      current = this.root;
      while (true) {
        //si el nuevo valor es menor que el valor del nodo actual, ir a la izq
        if (current && value < current.value) {
          //si no hay rama izquierda, insertar el nodo
          if (current.left === null) {
            current.left = node;
            break;
          } else {
            current = current.left;
          }
        } else if (current && value > current.value) {
          //si no hay rama derecha, insertar el nodo
          if (current.right === null) {
            current.right = node;
            break;
          } else {
            current = current.right;
          }
        } else {
          break;
        }
      }
    }
  },

  contains: function (value) {
    var found = false;
    let current = this.root;

    while (!found && current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    return found;
  },

  traverse: function (process) {
    // helper function
    function inOrder(node) {
      if (node) {
        // traverse the left subtree
        if (node.left !== null) {
          inOrder(node.left);
        }
        // call the process method on this node
        process.call(this, node);

        // traverse the right subtree
        if (node.right !== null) {
          inOrder(node.right);
        }
      }
    }

    // Iniciar con el nodo raíz
    inOrder(this.root);
  },

  remove: function (value) {
    var found = false,
      parent = null,
      current = this.root,
      childCount,
      replacement,
      replacementParent;

    // Asegurarse que hay un nodo para buscar
    while (!found && current) {
      // si el valor es menor que el nodo actual o current, ir a la izquierda
      if (value < current.value) {
        parent = current;
        current = current.left;

        // si el valor es mayor que el nodo actual o current, ir a la derecha
      } else if (value > current.value) {
        parent = current;
        current = current.right;

        // si el valor es igual, encontrado!
      } else {
        found = true;
      }
    }

    // solo ejecutar si el nodo es encontrado!
    if (found) {
      // figure out how many children
      childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);

      // special case: the value is at the root
      if (current === this.root) {
        switch (childCount) {
          case 0:
            this.root = null;
            break;

          case 1:
            this.root = current.left !== null ? current.left : current.right;
            break;

          case 2:
            // two children, find the right-most node in the left subtree
            replacement = current.left;
            replacementParent = current;

            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            // if the right-most node has a left child, update its parent's right child
            if (replacementParent !== current) {
              replacementParent.right = replacement.left;
            } else {
              // if the right-most node is the immediate left child of the current node
              replacementParent.left = replacement.left;
            }

            // assign children to the replacement
            replacement.right = current.right;
            replacement.left = current.left;

            // officially assign new root
            this.root = replacement;
            break;

          default:
            break;
        }
      } else {
        // non-root values
        switch (childCount) {
          case 0:
            // no children, remove reference from parent
            if (current.value < parent.value) {
              parent.left = null;
            } else {
              parent.right = null;
            }
            break;

          case 1:
            // one child, replace current with its child
            replacement = current.left !== null ? current.left : current.right;

            if (current.value < parent.value) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }
            break;

          case 2:
            // two children, find the right-most node in the left subtree
            replacement = current.left;
            replacementParent = current;

            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            // if the right-most node has a left child, update its parent's right child
            if (replacementParent !== current) {
              replacementParent.right = replacement.left;
            } else {
              // if the right-most node is the immediate left child of the current node
              replacementParent.left = replacement.left;
            }

            // assign children to the replacement
            replacement.right = current.right;
            replacement.left = current.left;

            // place the replacement in the right spot
            if (current.value < parent.value) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }
            break;

          default:
            break;
        }
      }
    }
  },

  size: function () {
    var length = 0;

    this.traverse(function (node) {
      length++;
    });

    return length;
  },

  toArray: function () {
    var result = [];

    this.traverse(function (node) {
      result.push(node.value);
    });

    return result;
  },

  toString: function () {
    return this.toArray().toString();
  },
};

const tree = new BinarySearchTree();

export default tree;
// tree.add(10);
// tree.add(5);
// // const nodo = tree.add(15);
// // tree.traverse()
// tree.traverse(function (tree) {
//   console.log(tree.value);
// });


// console.log(function(node) {
//   console.log(node.value);
// })