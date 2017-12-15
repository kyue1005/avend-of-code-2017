const input = "2 8 8 5 4 2 3 1 5 5 1 2 15 13 5 14";


const banks = input.split(' ');
const patterns = [];

for (let i = 0; i < banks.length; i++) {
    banks[i] = parseInt(banks[i], 10);
}

let count = 0;

const checkPattern = (current_pattern) => {
    let match = false;

    for (let i = 0; i < patterns.length; i++) {
        if (patterns[i] === current_pattern) {
            match = true;
            break;
        }
    }

    if (!match) {
        patterns.push(current_pattern);
    }

    return match;
}

const distributeBlocks = () => {
    let max = 0;
    let max_index = 0;

    for (let i = 0; i < banks.length; i++) {
        if (banks[i] > max) {
            max = banks[i];
            max_index = i;
        }
    }

    banks[max_index] = 0;

    for (; max > 0; max--) {
        max_index = (max_index + 1) % banks.length;
        banks[max_index] += 1;
    }

    return banks;
}

let current_pattern = banks.join(' ');

while(!checkPattern(current_pattern)) {
    count ++;
    distributeBlocks();
    current_pattern = banks.join(' ');
    console.log(current_pattern);
}

console.log(count);