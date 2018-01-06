function formatNumber(number) {
  const digits = Math.round(10 * number).toString().split('');
  let output = digits.slice(0, digits.length - 1).join('');
  if (digits[digits.length - 1] !== '0'){
    output += '.' + digits[digits.length - 1]
  }
  return output;
}

function findMedian(numbers) {
    let median = numbers[Math.floor(numbers.length/2)];
    if (numbers.length % 2 === 0) {
        median = median + numbers[Math.floor(numbers.length/2) - 1] / 2.0;
    }
    return formatNumber(median);
}

[ 1, 3] [2, 4]
