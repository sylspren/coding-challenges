let sortStack = function (stack) {
  let tmpStack = [];
  while (stack.length > 0) {
    let nextVal = stack[stack.length - 1];
    let smallest = tmpStack[tmpStack.length - 1];
    if (tmpStack.length === 0 || nextVal <= smallest) {
      tmpStack.push(stack.pop());
    } else {
      stack.pop();
      stack.push(tmpStack.pop());
      stack.push(nextVal);
    }
  }
  while (tmpStack.length > 0) {
    stack.push(tmpStack.pop());
  }
  return stack;
}

console.log(sortStack([5, 1, 4, 2, 3, 6]));
console.log(sortStack([2]));
console.log(sortStack([2, 1]));
console.log(sortStack([1, 2]));
console.log(sortStack([1, 1]));
