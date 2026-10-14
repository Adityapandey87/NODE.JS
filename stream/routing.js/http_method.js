const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET'&& req.url === '/about') {
        res.end('This is the about page.\n');
    }                   
        
    