let _aa = 'swrfwrg';
const _bb ={
	's1': 'aa',
	's2': [1,2,4]
};


let _gg = [55,6,4,45,2342];
for(let i of _gg){
	console.log(i);
}

_bb['s1'] = 'werw';
console.log(`<li>${_aa}</li>`);
console.log(_bb);

let = _arr = [15,23,34,5675,54,0,8];
let [ee,ff,...dd] = _arr;
console.log(dd);

let a = null,b = NaN;
[a,b] = [b,a];
console.log(`${a}<==>${b}`);

let [foo = true] = [1];
console.log(foo);

const fn = v=>v+5;
console.log(fn(9));

//短语法
let calculate = {
    array: [1, 2, 3],
    sum() {
        console.log(this === calculate); // true
        return this.array.reduce((result, item) => result + item);
    }
};
console.log(calculate.sum());

var _arr2 = [9,5];
[_arr2[0], _arr2[1]] = [_arr2[1], _arr2[0]];
console.log(_arr2);
