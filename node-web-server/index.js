const express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.status(200).json({ name: "<h1>Hi from express!</h1>" });
});

app.get("/bad", (req, res) => {
  res.status(400).json({ msg: "Sed, req failed" });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
