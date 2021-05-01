var express = require("express");
var dotenv = require("dotenv");
var path = require("path");
var http = require("http");
dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "Src")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Src", "index.html"));
});
const { PORT } = process.env;

const port = PORT || 4000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is on ${PORT}`);
});
