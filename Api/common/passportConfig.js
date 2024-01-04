const JwtStrategy = require("passport-jwt").Strategy;

module.exports = (passport) => {
  passport.use(
    "jwt",

    new JwtStrategy(
      {
        jwtFromRequest: fromCustomHeader("authorization"),
        secretOrKey: "secretKey",
      }

      ,
      async (jwtPayload, done) => {
        try {
          // Extract user
          const user = jwtPayload.user;
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};

function fromCustomHeader(header_name) {
  try {
    return function (request) {
      var token = null;
      if (request.headers[header_name]) {
        token = request.headers[header_name];
      }
      if (token === null) {
        token = request.cookies.auth;
      }
      return token;
    };
  }
  catch (ex) {
    console.log(ex);
  }
};