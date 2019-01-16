require("dotenv").load();

const auth0Domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`;
const auth0Audience = process.env.REACT_APP_AUTH0_AUDIENCE_URI;
const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0Domain}/.well-known/jwks.json`
  }),
  aud: auth0Audience,
  //issuer: auth0Domain,
  algorithm: ["RS256"]
});

const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from Public API"
  });
});

app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from Private API"
  });
});

app.get("/course", checkJwt, checkScope(["read:courses"]), function(req, res) {
  res.json({
    courses: [{ id: 1, title: "Build Apps" }, { id: 2, title: "Create Apps" }]
  });
});

function checkRole(role) {
  return function(request, response, next) {
    const assignedRoles = request.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return response.status(401).send("Insufficient role");
    }
  };
}

app.get("/admin", checkJwt, checkRole("admin"), function(req, res) {
  res.json({
    message: "Hello from Admin API"
  });
});

app.listen(3001);
console.log("API listening on port " + process.env.REACT_APP_API_URL);
