setTimeout(()=>{
    console.log("hello world")
} , 2000)


function getUser(id , callback) {
    // Simulate an API call
    setTimeout(() => {
        const user = { id: id, name: `User ${id}` };
        callback(null, user);
    }, 1000);
}
