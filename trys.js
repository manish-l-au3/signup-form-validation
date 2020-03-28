"use-strict";

const arrObj = [
  {
    name: "manish",
    age: 21
  },
  {
    name: "prabu",
    age: 22
  },
  {
    name: "raju",
    age: 20
  }
];

const len = arrObj.length;

arrObj.sort(function(a,b){
    return a.age - b.age;
})







