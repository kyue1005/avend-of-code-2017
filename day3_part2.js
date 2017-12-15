const input = 325489;

let layer = 0;
let spiral_matrix = [[1]];

const buildNextLayer = (matrix) => {
    const new_width = matrix.length + 2;
    const new_matrix = [];

    for (let i = 0; i < new_width; i++) {
        new_matrix[i] = [];

        for (let j = 0; j < new_width; j++) {
            if (i > 0 && i < new_width - 1 && j > 0 && j < new_width - 1) {
                new_matrix[i][j] = matrix[i-1][j-1];
            } else {
                new_matrix[i][j] = 0;
            }
        }
    }

    // gen outer layer
    for (let i = new_width - 2; i >= 0; i--) {
        new_matrix[i][new_width - 1] = sumNeighbours(i, new_width - 1, new_matrix);
    }

    for (let i = new_width - 2; i >= 0; i--) {
        new_matrix[0][i] = sumNeighbours(0, i, new_matrix);
    }

    for (let i = 1; i < new_width; i++) {
        new_matrix[i][0] = sumNeighbours(i, 0, new_matrix);
    }

    for (let i = 1; i < new_width; i++) {
        new_matrix[new_width - 1][i] = sumNeighbours(new_width - 1, i, new_matrix);
    }

    return new_matrix;
}

const sumNeighbours = (y, x, matrix) => {
    const bound = [x-1, x+1, y-1, y+1];

    let sum = 0;

    if (x === matrix.length - 1) {
        bound[1] = matrix.length - 1;
    }

    if (x === 0) {
        bound[0] = 0;
    }

    if (y === matrix.length - 1) {
        bound[3] = matrix.length - 1;
    }

    if (y === 0) {
        bound[2] = 0;
    }

    for (let i = bound[2]; i <= bound[3]; i++) {
        for (let j = bound[0]; j <= bound[1]; j++) {
            sum += matrix[i][j];
        }
    }

    return sum;
}

let max = 0;

while (max < input) {
    spiral_matrix = buildNextLayer(spiral_matrix);

    max = spiral_matrix[spiral_matrix.length-1][spiral_matrix.length-1];
}

console.log(spiral_matrix);

const layer_seq = [];

for (let i = spiral_matrix.length - 2; i >= 0; i--) {
    layer_seq.push(spiral_matrix[i][spiral_matrix.length - 1]);
}

for (let i = spiral_matrix.length - 2; i >= 0; i--) {
    layer_seq.push(spiral_matrix[0][i]);
}

for (let i = 1; i < spiral_matrix.length; i++) {
    layer_seq.push(spiral_matrix[i][0]);
}

for (let i = 1; i < spiral_matrix.length; i++) {
    layer_seq.push(spiral_matrix[spiral_matrix.length - 1][i]);
}

for (let i = 0; i < layer_seq.length; i++) {
    if (layer_seq[i] > input && max > layer_seq[i]) {
        max = layer_seq[i];
    }
}

console.log(max);