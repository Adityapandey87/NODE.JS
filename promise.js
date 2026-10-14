// const fetchuserdata = new Promise((resolve, reject) => {
//     let success = true;
//     setTimeout(() => {
//         resole(id:101, username:"Ashish"));
//     )else{
//         reject("failed to fetch user data");

//     }
// },1000);
// }};
// console.log(fetchuserdata);



const promise1 = new Promise((resolve, reject) => {
    let success = true
        if (success) {
            resolve({ 
                id: 101,
                username: "Ashish"
            })
        } 
        else {
            reject("failed to fetch  data");
        }   
    })
    
    promise1
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    }); 



const promise2 = new Promise((resolve, reject) => {
     let success = true
        if (success) {
            resolve({ 
                id: 101,
                username: "Ashish"
            })
        } 
        else {
            reject("failed to fetch  data");
        }   
    })
    
    promise2
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
    
    Promise.all([
        promise1,
        promise2])
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error(error);
    });


Promise.allSettled([
    promise1,
    promise2])
    Promise.allSettled([
        promise1,
        promise2])
        .then((results) => {
            console.log(results);
        })
        .catch((error) => {
            console.error(error);
        });

        Promise.any([
            promise1,
            promise2])
            .then((result) => {
                console.log(result);
               return response
            })
            .then((response) => {
                console.log("response", response);
            })
            .catch((error) => {
                console.error(error);
            });

            function fetchUserData() {
                return ((resolve, reject) => {





            async function getuser() {
                const user = await fetchUser();
                console.log(user);
            }
            getuser()
