// assingning a number to a variable with type specified.
let x:number = 101;
console.log(x);

//function argument with type specified.
// function greet(name: string){
//     console.log("Hello " + name);
// }

// greet("John");

//return type specified.

function add(a: number, b: number): number{
    return a + b;
}

console.log(add(10, 20));

// function isLegal(age: number): boolean{
//     return age >= 18;
// }

// console.log(isLegal(20));

function runAfterDelay(callback : () => void){
    setTimeout(callback, 1000);
}

runAfterDelay(function(){
    console.log("After 1 second");
});

//Interface

interface User{
    name: string;
    age: number;
}

function isLegal(user: {
    name: string;
    age: number; // User type can be used here.
}){
    return user.age >= 18;
}

function greet(user: {
    name: string;
    age: number;    // User type can be used here.
}){
    console.log("Hello " + user.name);

}

greet({name: "John", age: 20});
console.log(isLegal({name: "John", age: 20}));
isLegal({name: "John", age: 20});
