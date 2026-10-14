import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
}); 
const PORT = 3000;
const address = "127.0.0.1";
server.listen(PORT, address, () => {
  console.log(`Server running at http://${address}:${PORT}/`);


});
