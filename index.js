const http = require("http");
const requests = require("requests");
const fs = require("fs");

const homefile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempval, curval) => {
  let temperature = tempval.replace("{%tempval%}", curval.main.temp);
  temperature = temperature.replace("{%country%}", curval.sys.country);
  temperature = temperature.replace("{%location%}", curval.name);
  temperature = temperature.replace("{%tempmin%}", curval.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", curval.main.temp_max);
  temperature = temperature.replace("{%tempmax%}", curval.main.temp_max);
  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "http://api.openweathermap.org/data/2.5/weather?q=pune&appid=1331d5da1a93b4fa486f8f4cfab08be2&units=metric"
    )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrdata = [objdata];
        const realTimeData = arrdata
          .map((val) => replaceVal(homefile, val))
          .join("");
        res.write(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  }
});

server.listen(8001, "127.0.0.1", () => {
  console.log("listennining");
});
