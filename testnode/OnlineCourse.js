console.log(typeof null); //object   ----> JS 的 bug
console.log(typeof []); // object

var a = 20;

if ((a = 10)) {
  console.log(a);
}

var a = "weqwqw";

var b = Number(a);
console.log(b === b); //false   -----> NaN 不等於 NaN

/*--------------------------LET VS CONST SCOPE--------------------------------- */

var a = "global";

function test() {
  var a = "test inner";
  console.log(a);
  function innerTest() {
    console.log("innerTest", a);
  }
  innerTest();
}
function globalTest() {
  console.log("globalTest", a);
}
console.log(a);
globalTest();
test();

/*---------------------------HOISTING 提升-------------------------------------- */
 
//直接console.log error 


console.log(Q);
var Q = 12;
// ================   上下相等

var I;
console.log(I);
I = 12;

//  提升順序 ->   1. function 2. arguments 3 variable

/*-----------------------HOISTING 原理------------------------------------------ */

/*---------------------Execution Context & Variable Object-------------------- */

/*----------------------LET & CONST HOISTING -------------------------------- */

/*----------------------CLOSURE 閉包----------------------------------------- */

   //所有函式都是閉包 
   //閉包可以解釋為 在一個function return 一個 function 


/*------------------------------------------------------------------------- */   