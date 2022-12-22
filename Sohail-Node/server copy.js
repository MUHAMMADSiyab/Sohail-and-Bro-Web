const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  console.log(req);
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello World</h1>");
  res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
