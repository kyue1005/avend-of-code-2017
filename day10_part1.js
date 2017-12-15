const input = `102,255,99,252,200,24,219,57,103,2,226,254,1,0,69,216`;
const list = Array.apply(null, Array(256)).map(function (_, i) {return i;});

// const input = '3,4,1,5';
// const list = Array.apply(null, Array(5)).map(function (_, i) {return i;});

let cur_pos = 0;

const lengths = input.split(',');

for (let i = 0; i < lengths.length; i++) {
    lengths[i] = parseInt(lengths[i], 10);
}

for (let i = 0; i < lengths.length; i++) {
    let sublist = [];

    console.log(cur_pos, lengths[i], list.length);
    if (cur_pos + lengths[i] < list.length) {
        sublist = list.slice(cur_pos, cur_pos + lengths[i]);   
    } else {
        sublist = list.slice(cur_pos);
        const remain = lengths[i] - sublist.length;

        console.log(lengths[i], sublist.length, remain);

        for (let j = 0; j < remain; j++) {
            sublist.push(list[j]);
        }
    }
    console.log(sublist.length);
    console.log('+++++++++++++++++++++');

    for (let j = sublist.length - 1; j >= 0; j--) {
        const index = (cur_pos + (sublist.length - 1 - j)) % list.length;
        list[index] = sublist[j];
    }

    cur_pos = (cur_pos + i + lengths[i]) % list.length;
}

console.log(list[0] *list[1]);