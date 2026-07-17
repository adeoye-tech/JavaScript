const a = 10;
const b = 5;
console.log(a+b);
console.log(a-b);
console.log(a*b);


console.log(5=="5");
console.log(5==="5");
console.log(5!=6);
console.log(5!=="5");

const isStudent = true;
console.log(!isStudent);
const age =20;
console.log(age>18 && age<30);
console.log(age>18 || age<10);

function add(a,b) {
    return a+b;

}
console.log(add(5,3));

function addNumbers() {
    return 10;
}
console.log(addNumbers());

function greet() {
    return "Hello";
}
let message = greet();
console.log(message);