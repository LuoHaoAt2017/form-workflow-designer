import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
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
  app.use(cookieParser());
  app.use("/index.html", express.static("./dist/assets"));
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
      const auth = await Auth.findOne({
        where: {
          username: username,
        },
      });
      if (!auth) {
        return done(null, false);
      }
      if (auth.password !== password) {
        return done(null, false);
      }
      const user = await auth.getUser();
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
    done(null, (user as any).user_id);
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
