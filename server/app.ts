import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import express from "express";
import moment from "moment";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";
import { Strategy as LocalStrategy } from "passport-local";
import router from "./routes/router";
import connect from "./model/index";
import { User } from "./model/user";
import { Auth } from "./model/auth";

(async function () {
  await connect();
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
  app.use(cookieParser());
  app.use("/", express.static("./dist/assets"));
  app.use(
    cookieSession({
      name: "workflow-session",
      keys: ["workflow"],
      maxAge: 60 * 1000, // 24 hours
    })
  );
  app.use(
    cors({
      origin: [
        "http://localhost:8088",
        "https://github.com",
        "https://api.github.com",
      ],
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      maxAge: 60,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    })
  );
  passport.use(
    new GithubStrategy(
      {
        clientID: "86d93135315c3a9b5b9b",
        clientSecret: "eed9f615c5a5beaab7fd4c8d1ce08c968414671c",
        callbackURL: "http://localhost:9001/auth-github-redirect",
        authorizationURL: "https://github.com/login/oauth/authorize",
        tokenURL: "https://github.com/login/oauth/access_token",
        userProfileURL: "https://api.github.com/user",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const [user, created] = await User.findOrCreate({
          where: {
            github_id: profile.id,
          },
          defaults: {
            user_name: profile.name,
            github_id: profile.id,
          },
        });
        if (created) {
          const auth = await Auth.create({
            username: user.user_name,
            password: user.user_name,
          });
          user.setAuth(auth);
        }
        return cb(null, user);
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, (user as any).id);
  });
  passport.deserializeUser(async function (id: string, done) {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  app.use(router);
  app.listen(9001, "localhost", function () {
    console.log("requset at ", moment().format("YYYY-MM-DD HH:mm:ss"));
  });
})();
