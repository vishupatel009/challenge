const express = require("express");
const app = express();
const registerRoutes = require("./routes");

// server config
const port = process.env.PORT || 8080;

// serving index.html from public folder
app.use(express.static("public"));

app.use(function (req, res, next) {
  // In order to connect with front end
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// register routes
registerRoutes(app);

// create server start method
const start = () => {
  return new Promise((resolve, reject) => {
    // start the server
    app.listen(port, () => {
      console.log(`Connected to Port ${port}`);
      resolve();
    });
  }).catch(error => {
    console.log(`failed to start server => ${error.message}`);
  });
};

module.exports = start;
