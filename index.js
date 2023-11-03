// Import required modules and packages
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;
const db = require("./config/mongoose");

// Configure body-parser middleware to parse URL-encoded data
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Configure sessions and authentication using Passport
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport");

// Configure session storage using MongoDB
const MongoStore = require("connect-mongo");

// Use cookie-parser middleware to handle cookies
app.use(cookieParser());

// Set up the view engine for rendering templates
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Configure session management
app.use(
  session({
    name: "placement-cell",
    secret: "asewe",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // Use MongoStore for session storage
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://placement123:987654321@cluster0.tp5xdt5.mongodb.net/?retryWrites=true&w=majority",
      autoRemove: "disabled",
    }),
    // Log any potential errors during MongoStore setup
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

// Initialize Passport and session support
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set the authenticated user in the response
app.use(passport.setAuthenticatedUser);

// Use the defined routes in the 'routes' file
app.use(require("./routes"));

// Configure body-parser to parse JSON data
app.use(bodyParser.json());

// Start the Express server and listen on the specified port
app.listen(port, (err) => {
  if (err) {
    console.log("error in starting the server", err);
    return;
  }
  console.log("server is successfully running on port 3000");
});
