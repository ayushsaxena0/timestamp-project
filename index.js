// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", getDate);

function getDate(req, res) {
  const date = req.params.date;
  let dateObj;
  if (!date) {
    dateObj = new Date();
  } else if (!isNaN(date) && Number.isInteger(Number(date))) {
    dateObj = new Date(Number(date));
  } else {
    dateObj = new Date(date);
  }
  const obj = {
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  };
  return res.json(isNaN(obj.unix) ? { error: "Invalid Date" } : obj);
}

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
