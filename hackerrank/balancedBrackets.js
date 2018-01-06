
const closingBracketFor = {
    '{': '}',
    '[': ']',
    '(': ')',
}

function isMatched(expression) {
    if (expression.length === 0){
        return true;
    }

    if (expression.length % 2 === 1){
      return false;
    }

    let bracketStack = []

    expression.forEach(function (bracket) {
      const previous = bracketStack[bracketStack.length - 1];
      if (closingBracketFor[previous] === bracket) {
        bracketStack = bracketStack.slice(0, bracketStack.length - 1);
      } else {
        bracketStack.push(bracket);
      }
    })

    return bracketStack.length === 0;
}

console.log(isMatched('{[]()}'.split('')));
console.log(isMatched('{[(])}'.split('')));
console.log(isMatched(''.split('')));

// {()()}
