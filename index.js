// A static server using Node and Express
const express = require("express");
const app = express();

// make all the files in 'public' available on the Web
app.use(express.static("public"));

// app.use(express.json);
// when there is nothing following the slash in the url, return the main page of the app.
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/examples.html");
});

// a module to use instead of older body-parser; not needed yet, but very useful!
app.use(express.json());

// This is where the server recieves and responds to POST requests
app.post('/submission', function(request, response, next) {
  console.log("Server recieved a post request at", request.url);
  response.send("I got your POST request");
  console.log(request.body);
  console.log(typeof request);
});


// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});
