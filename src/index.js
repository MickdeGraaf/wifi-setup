import express from "express";
import fs from "fs";
import piWifi from "pi-wifi";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var index = fs.readFileSync('src/index.html', 'utf8');

// respond with "hello world" when a GET request is made to the homepage
app.all('/', function (req, res) {

  //if network present in post vars
  if(req.body.network) {
      piWifi.connect(req.body.network, req.body.password, function(err) {
      if (err) {
          return console.error(err.message);
      }
          console.log('Successful connection!');
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end("SUBMITTED");
          return;
      });
  }

  piWifi.scan(function(err, networks) {
      if (err) {
          //res.writeHead(200, {'Content-Type': 'text/html'});
          //res.end(":(");
          //console.log(console.log(JSON.stringify(index)));
          //return console.error(err.message);
      }

      if(!networks) {
          networks = [{ssid: "TEST"}];
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
