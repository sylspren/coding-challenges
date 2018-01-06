function isMatched(expression) {
    if (expression.length === 0){
        return true;
    }

    if (expression[0] === expression[expression.length - 1]) {
        return isMatched(expression.slice(1, expression.length));
    }

    return false;
}

isMatched('{[()]}'.split(''));
