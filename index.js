const http = require("http");
const requests = require("requests");

const server = http.createServer((res, req) => {
  requests(
    "http://api.openweathermap.org/data/2.5/weather?q=pune&appid=1331d5da1a93b4fa486f8f4cfab08be2"
  )
    .on("data", (chunk) => {
      const objdata = JSON.parse(chunk);
      console.log(objdata.main);
    })
    .on("end", function (err) {
      if (err) return console.log("connection closed due to errors", err);
    });
  req.end("hi");
});

server.listen(8081, "127.0.0.1", () => {
  console.log("listennining");
});
