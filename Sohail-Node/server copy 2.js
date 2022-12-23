const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  // File System
  // fs.readFile("index.html", (err, data) => {
  //   if (err) throw err;

  //   res.setHeader("Content-Type", "text/html");

  //   res.write(data);

  //   res.end();
  // });

  // fs.writeFile("demo.txt", "Some dummy text", (err) => {
  //   if (err) throw err;

  //   res.end();
  // });

  // fs.appendFile("demo.txt", " Another text inserted", (err) => {
  //   if (err) throw err;

  //   res.end();
  // });

  // fs.rename("demo.txt", "demo-one.txt", (err) => {
  //   res.end();
  // });

  // fs.copyFile("index.html", "public/index.html", (err) => {
  //   res.end();
  // });

  fs.mkdir("awesome", () => {
    res.end();
  });

  // fs.unlink("demo-one.txt", (err) => {
  //   res.end();
  // });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
