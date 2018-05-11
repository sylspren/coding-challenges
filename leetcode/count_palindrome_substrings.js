/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  // start growing from smallest nuggets?
  let count = 0;
  for (var i = 0; i < s.length; i++) {
    count += 1; // single character
    count += countSubstringsFrom(s, i-1, i+1);
    // don't forget evens
    count += countSubstringsFrom(s, i, i+1);
  }
  return count;
};

let countSubstringsFrom = function (s, begin, end) {
  var count = 0;
  while (begin >= 0 && end < s.length) {
    if (s[begin] === s[end]) {
      count += 1;
      begin--;
      end++;
    } else {
      break;
    }
  }
  return count;
}

console.log(countSubstrings("aaa"));
