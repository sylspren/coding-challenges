let pairwise_swap = function (num) {
  let swapper = parseInt("01010101010101010101010101010101", 2);
  let swapped = ((num & swapper) << 1) | ((num & (swapper << 1)) >> 1);
  return swapped.toString(2);
}

console.log(pairwise_swap(parseInt("0110", 2)));
console.log(pairwise_swap(parseInt("100000", 2)));
console.log(pairwise_swap(parseInt("000001", 2)));
