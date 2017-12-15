const input = 325489;

const square_number = Math.floor(Math.sqrt(input));
const layer = (square_number % 2 === 0) ? Math.floor(square_number / 2) : Math.floor(square_number / 2) + 1;
const width = layer * 2 + 1;

console.log(square_number, layer);

layer_start = Math.pow((layer) *2 - 1, 2);

// consider each side as four seq.
const median = Math.floor(width / 2);
const seq_pos = (input - layer_start) % (width -1);

console.log(median, seq_pos);

const delta = Math.abs(median - seq_pos);
distance = layer + delta;

console.log(distance);