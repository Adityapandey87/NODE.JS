console.log("===synchronous start");
for(let i=1;i<10;i++){
    console.log("$(1)");

}
console.log("===synchronous start");

console.log("===asynchronous start");
setTimeout(()=>{
    console.log("hello world")
},2000);
console.log("===asynchronous end");