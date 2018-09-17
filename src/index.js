import express from "express";
import fs from "fs";
import piWifi from "pi-wifi";

const app = express();
const port = 3000;


var index = fs.readFileSync('src/index.html');

// respond with "hello world" when a GET request is made to the homepage
app.all('/', function (req, res) {

  piWifi.scan(function(err, networks) {
  if (err) {
      return console.error(err.message);
  }
    console.log(networks);
  });

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
