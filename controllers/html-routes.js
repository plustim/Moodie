var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/gallery", function(req, res) {
    res.render("gallery", photoArray);
  });

  // blog route loads blog.html
  app.get("/game", function(req, res) {
    res.render("game", webCam);
  });

};