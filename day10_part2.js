const input = `102,255,99,252,200,24,219,57,103,2,226,254,1,0,69,216`;
const list = Array.apply(null, Array(256)).map(function (_, i) {return i;});

// const input = '3,4,1,5';
// const list = Array.apply(null, Array(5)).map(function (_, i) {return i;});

let cur_pos = 0;

const lengths = [];

for (let i = 0; i < input.length; i++) {
    lengths[i] = input.charCodeAt(i);
}

lengths.push(17);
lengths.push(31);
lengths.push(73);
lengths.push(47);
lengths.push(23);

for (let r = 0; r < 64; r++) {
    for (let i = 0; i < lengths.length; i++) {
        let sublist = [];

        if (cur_pos + lengths[i] < list.length) {
            sublist = list.slice(cur_pos, cur_pos + lengths[i]);   
        } else {
            sublist = list.slice(cur_pos);
            const remain = lengths[i] - sublist.length;

            for (let j = 0; j < remain; j++) {
                sublist.push(list[j]);
            }
        }

        for (let j = sublist.length - 1; j >= 0; j--) {
            const index = (cur_pos + (sublist.length - 1 - j)) % list.length;
            list[index] = sublist[j];
        }

        cur_pos = (cur_pos + (i + lengths.length * r) + lengths[i]) % list.length;

        // console.log(i + lengths.length * r, lengths[i], cur_pos);
    }
    // console.log('===========================')
}

const dense = [];

for (let i = 0; i < 16; i++) {
    dense[i] = list[i * 16];

    for (let j = 1; j < 16; j++) {
        dense[i] = dense[i] ^ list[16 * i + j];
    }
}
console.log(dense);

console.log(dense.map(d => {
    const hex = d.toString(16);
    if (hex.length === 1)  return '0' + hex;
    else return hex
}).join(''));