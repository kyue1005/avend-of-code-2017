const input = `0: 4
1: 2
2: 3
4: 5
6: 6
8: 4
10: 8
12: 6
14: 6
16: 8
18: 8
20: 6
22: 8
24: 9
26: 8
28: 8
30: 12
32: 12
34: 10
36: 12
38: 12
40: 10
42: 12
44: 12
46: 12
48: 12
50: 12
52: 14
54: 14
56: 12
58: 14
60: 14
62: 14
64: 17
66: 14
70: 14
72: 14
74: 14
76: 14
78: 18
82: 14
88: 18
90: 14`;

const test = `0: 3
1: 2
4: 4
6: 4`;

const layers = [];
let severity = 0;

const lines = input.split('\n');
const max_layer = parseInt(lines[lines.length - 1].split(': ')[0], 10);

for (let i = 0; i <= max_layer; i++) {
    layers[i] = 0;
}

lines.map(l => {
    [index, value] = l.split(': ');
    layers[index] = parseInt(value, 10);
});

const scannerPosition = (step) => {
    let position = -1;

    if (layers[step] > 0) {
        position = step % ((layers[step] -1) * 2);
        if (position >= layers[step]) {
            position = ((layers[step] -1) * 2) - position;
        }
    }

    return position;
}

for (let i = 0; i <= max_layer; i++) {
    if (scannerPosition(i) === 0) {
        severity += i * layers[i];
        console.log('caught!', i, layers[i], i * layers[i]);
    }
}

console.log(severity);