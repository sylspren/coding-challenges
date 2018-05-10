// given a binary tree with int values return the # of paths
// that sum to a given value


let countPaths = function (node, sum, inclusive) {
  var count = 0;
  if (node.value === sum) {
    count += 1;
  }

  if (node.left) {
    if (!inclusive) {
      count += countPaths(node.left, sum);
    }
    count += countPaths(node.left, sum - node.value, true);
  }

  if (node.right) {
    if (!inclusive) {
      count += countPaths(node.right, sum);
    }
    count += countPaths(node.right, sum - node.value, true);
  }

  return count;
}

let countPaths2 = function (root, sum, inclusive) {
  let stack = [{node: root, sums: [root.value]}];
  var count = 0;
  if (root.value === sum) {
    count += 1;
  }

  while (stack.length > 0 ) {
    let {node, sums} = stack.pop();

    [node.left, node.right].forEach(function (child) {
      if (!child) { return; }
      let nextSums = [];
      sums.forEach(function (s) {
        nextSums.push(s + child.value);
        if (s + child.value === sum) {
          count += 1;
        }
      });
      nextSums.push(child.value);
      if (child.value === sum) {
        count += 1;
      }
      stack.push({node: child, sums: nextSums});
    });
  }

  return count;
}



class Node {
  constructor(value) {
    this.value = value;
  }
}

// utility function to make a binary tree from lists
// eg.            [1]
//             [2,   3]
//           [4, 5, null, 7]
let treeify = function (levels) {
  let root = new Node(levels[0][0]);
  let prevLevel = [root];
  levels.slice(1).forEach(function (level) {
    let nextLevel = [];
    for (var i = 0; i < level.length / 2; i++) {
      left = level[2*i] ? new Node(level[2*i]) : null;
      right = level[2*i+1] ? new Node(level[2*i + 1]) : null;
      if (prevLevel[i]) {
        prevLevel[i].left = left;
        prevLevel[i].right = right;
      }
      nextLevel.push(left);
      nextLevel.push(right);
    }
    prevLevel = nextLevel;
  });
  return root;
}

let root = treeify([
        [3],
      [2, 2],
   [3, -5, null, 7],
 [10, 5, null, null, null, null, -2, 1]
]);

console.log(countPaths(root, 5));
console.log(countPaths2(root, 5));
