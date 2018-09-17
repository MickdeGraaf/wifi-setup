import express from "express";
import fs from "fs";
import piWifi from "pi-wifi";

const app = express();
const port = 3000;


var index = fs.readFileSync('src/index.html', 'utf8');

// respond with "hello world" when a GET request is made to the homepage
app.all('/', function (req, res) {

  piWifi.scan(function(err, networks) {
    if (err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(":(");
        console.log(console.log(JSON.stringify(index)));
        return console.error(err.message);
    }

    let networkOptions = "";
    networks.forEach(function(network) {
        networkOptions += "<option value='" + network.ssid + "'>" + network.ssid +  "</option>";
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index.replace("[OPTIONS]", networkOptions));
  });


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
