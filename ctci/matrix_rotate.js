let swap2 = function (matrix, [p1, p2]) {
  let [x1, y1] = p1;
  let [x2, y2] = p2;
  matrix[x1][y1] = matrix[x1][y1] ^ matrix[x2][y2];
  matrix[x2][y2] = matrix[x1][y1] ^ matrix[x2][y2];
  matrix[x1][y1] = matrix[x1][y1] ^ matrix[x2][y2];
}

let swap4 = function (matrix, positions) {
  swap2(matrix, [positions[0], positions[3]]);
  swap2(matrix, [positions[1], positions[3]]);
  swap2(matrix, [positions[2], positions[3]]);
}

let printMatrix = function (matrix) {
  console.log();
  matrix.forEach(function (row) {
    console.log(row.join(' '));
  });
}

let rotate = function (matrix) {
  printMatrix(matrix);
  if (matrix.length !== matrix[0].length) {
    throw new Error('cannot rotate a non-square matrix')
  }
  let size = matrix.length;
  for (i = 0; i < Math.floor(size/2); i++) {
    for (j = i; j < size - i - 1; j++) {
      swap4(matrix, [
        [i, j],
        [j, size - i - 1],
        [size - i - 1, size - j - 1],
        [size - j - 1, i]
      ]);
    }
  }
  printMatrix(matrix);
}

rotate([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);
