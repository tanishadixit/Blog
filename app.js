// //run with > node app.js

// //jshint esversion:6

// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

// Create an Express application
const app = express();

// Define some sample content for About and Contact pages
const about = "Welcome to Synchronised Lifestyle, where life's diverse notes harmonize in a beautiful symphony. We're more than a blog; we're your guide to living with intention. Our bloggers cover a spectrum of topics, from fashion and travel to health and mindfulness, offering insights for every facet of your life. Here, you'll find a community of like-minded individuals who share your passions and interests. Synchronised Lifestyle invites you to create, connect, and explore your unique journey. Your life is the canvas, and we provide the palette. Join us and be inspired to paint your dreams. Synchronised Lifestyle is where your life finds its rhythm, where harmony meets expression, and every click leads to endless possibilities.";
const contact = "Email Address: contact@synchronisedlifestyle.com";

// Create an array to store blog posts
const posts = [];

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware for parsing form data and serving static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define routes and their respective handlers

// Home route - Renders the home page with a list of blog posts
app.get("/", function (req, res) {
  res.render("home", {
    posts: posts
  });
});

// About route - Renders the About page with predefined content
app.get("/about", function (req, res) {
  res.render("about", {
    aboutUs: about
  });
});

// Contact route - Renders the Contact page with predefined content
app.get("/contact", function (req, res) {
  res.render("contact", {
    contactUs: contact
  });
});

// Compose route - Renders a form for creating new blog posts
app.get("/compose", function (req, res) {
  res.render("compose");
});

// Individual Post route - Displays a single blog post based on its title
app.get("/posts/:title", function (req, res) {
  var addressBarPostTitle = _.lowerCase(req.params.title);

  posts.forEach(function (post) {
    var actualPostTitle = _.lowerCase(post.title);
    if (actualPostTitle === addressBarPostTitle) {
      addressBarPostTitle = _.kebabCase(addressBarPostTitle);
      res.render("posts", {
        postTitle: post.title,
        postContent: post.content,
        addressBarPostTitle: addressBarPostTitle
      });
    }
  });
});

// Compose form submission - Handles the creation of new blog posts
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
