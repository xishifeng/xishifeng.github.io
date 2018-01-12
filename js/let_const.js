let _aa = 'swrfwrg';
const _bb ={
	's1': 'aa',
	's2': [1,2,4]
};

let _gg = [55,6,4,45,2342];
for(let i of _gg){
	console.log(i);
};

let [ee,ff,...dd] = _gg;
console.log(dd);

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
console.log(`${_arr2[0]}<==>{${_arr2[1]}}`);

let isaa;
console.log(isaa);

console.log(~'gjhuopmm'.indexOf('g'));
console.log(-89.753|0);//取整
console.log(~~-89.753);//取整
console.log(567/2);
console.log(567<<1);//除二向下取整
console.log(~"1234".indexOf("1"));

//判断一个非负整数 n 是不是 2的非负 整数次幂。
function isPowerOfTwo(n) {
  return !(n & (n - 1));
};

//奇数偶数判断
function assert(n){
	return (n&1)?'jishu':'oushu'
};

if(~'yyht'.indexOf('h')){
	//zai zi fu chuan 
};

console.log(1<<1);
console.log(!(456^456));//检查两个数是否相等
console.log(!(456^457));

//16进制颜色值转RGB：
function hexToRGB(hex){
    var hex = hex.replace("#","0x"),
        r = hex >> 16,
        g = hex >> 8 & 0xff,
        b = hex & 0xff;
    return "rgb("+r+","+g+","+b+")";
}

//RGB转16进制颜色值：
function RGBToHex(rgb){
    var rgbArr = rgb.split(/[^\d]+/),
        color = rgbArr[1]<<16 | rgbArr[2]<<8 | rgbArr[3];
    return "#"+color.toString(16);
};

console.log(`${null} ==> ${!!null}`);
console.log(`${undefined} ==> ${!!undefined}`);
console.log(`${true} ==> ${!!true}`);
console.log(`${false} ==> ${!!false}`);
console.log(`${''} ==> ${!!''}`);
console.log(`${[]} ==> ${!![]}`);
console.log(`${0} ==> ${!!0}`);
console.log(`${1} ==> ${!!1}`);
console.log(`${576} ==> ${!!576}`);
console.log(`${-576} ==> ${!!-576}`);
console.log(`${'fdg'} ==> ${!!'fdg'}`);
console.log(`${NaN} ==> ${!!NaN}`);
