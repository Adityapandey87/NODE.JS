const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/about') {
        res.end('This is the about page.\n');

    } else if (req.url === '/contact') {
        res.end('This is the contact page.\n');

    } else if (req.url === '/home') {
        res.end('This is the home page.\n');

    } else {
        res.end('Page not found.\n');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});