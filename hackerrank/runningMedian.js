function formatNumber(number) {
  const digits = Math.round(10 * number).toString().split('');
  console.log(digits.slice(0, digits.length - 1).join('') + '.' + digits[digits.length - 1]);
}

function newNode(value) {
  return {
    val: value,
    left: null,
    right: null,
  };
}

function sortNodes(left, right, operand) {
  if (!left) {
    return [left, right];
  } else if (!right) {
    return [right, left];
  } else {
    return operand(left.val, right.val) ? [right, left]: [left, right];
  }
}

function insert(node, value, operand) {
  if(!node) {
    return newNode(value);
  }

  let nextVal;
  if (operand(value, node.val)) {
    nextVal = node.val;
    node.val = value;
  } else {
    nextVal = value;
  }

  if (!node.left) {
    node.left = newNode(nextVal);
  } else if (!node.right) {
    node.right = newNode(nextVal);
  } else {
    insert(sortNodes(node.left, node.right, operand)[0], nextVal, operand);
  }
  return node;
}

function pop(node, operand, parent, direction) {
  if (!node.left && !node.right) {
    if (parent) { parent[direction] = null; }
    return null;
  }
  const [min, max] = sortNodes(node.left, node.right, operand);
  node.val = max.val;
  pop(max, operand, node, (node.left && max.val === node.left.val) ? 'left': 'right');
  return node;
}


let maxHead = null;
let maxSize = 0;

let medianNode = null;

let minHead = null;
let minSize = 0;

const maxOperand = (a, b) => a >= b
const minOperand = (a, b) => a <= b

function buildHeaps(value) {
  if (!medianNode) {
    return medianNode = value;
  }

  function insertMax(value) {
    maxHead = insert(maxHead, value, maxOperand);
    maxSize += 1;
  }
  function insertMin(value) {
    minHead = insert(minHead, value, minOperand);
    minSize += 1;
  }
  function popMax() {
    maxHead = pop(maxHead, maxOperand);
    maxSize -= 1;
  }
  function popMin(value) {
    minHead = pop(minHead, minOperand);
    minSize -=1;
  }

  if (value > medianNode) {
    if (maxSize < minSize) {
      insertMax(medianNode);
      if (minHead.val < value) {
        medianNode = minHead.val;
        popMin();
        insertMin(value);
      } else {
        medianNode = value;
      }
    } else {
      insertMin(value);
    }
  } else {
    if (minSize < maxSize) {
      insertMin(medianNode);
      if (maxHead.val > value) {
        medianNode = maxHead.val;
        popMax();
        insertMax(value);
      } else {
        medianNode = value;
      }
    } else {
      insertMax(value);
    }
  }
}

function nextMedian(value) {
  buildHeaps(value);

  let median = medianNode;
  if (minSize > maxSize) {
    median = (median + minHead.val) / 2.0;
  } else if (maxSize > minSize) {
    median = (median + maxHead.val) / 2.0;
  }

  return formatNumber(median);
}

[12, 4, 5, 3, 8, 7].forEach((i) => nextMedian(i))

//for(var i = 0; i < 10000; i++){
//  nextMedian(Math.round(Math.random()*100));
//}
