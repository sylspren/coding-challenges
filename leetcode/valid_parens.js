/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let stack = [];
  let closingPair = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  for (i = 0; i < s.length; i++) {
    let paren = s[i];
    if (['(', '[', '{'].includes(paren)) {
      stack.push(paren);
    } else {
      var expected = closingPair[stack.pop()];
      if (expected !== paren) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));
console.log(isValid("({})"));
