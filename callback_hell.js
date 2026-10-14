function getUser(id, callback) {
    setTimeout(() => {
        console.log("User fetched");
        const user = {
            id: 1,
            username: "Ashish",
        };
        callback(null, user);
    }, 100);
}

// Call the function
getUser(1, (err, user) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("User data:", user);
});getuser{
    function(error,user){
        if error{
            console.log("error");
        }return ;
}
getProfile(user.id,function(error,profile){
    if error{
        console.log("error");
    }return ;
}     getPosts(profile.id,function(error,posts){
    if error{
        console.log("error");
    }return ;
}console.log("posts",po0sts)