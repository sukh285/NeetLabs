import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { db } from "../libs/db.js";
import axios from "axios";

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://neetlabs.onrender.com/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const existingUser = await db.user.findUnique({
          where: { email },
        });

        if (existingUser) return done(null, existingUser);

        const newUser = await db.user.create({
          data: {
            email,
            name: profile.displayName,
            image: null,
            role: "USER",
          },
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails?.[0]?.value;

        // If email not present in profile, fetch it manually
        if (!email) {
          const res = await axios.get("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${accessToken}`,
              Accept: "application/vnd.github+json",
            },
          });

          const primaryEmail = res.data.find(
            (emailObj) => emailObj.primary && emailObj.verified
          );
          email = primaryEmail?.email;
        }

        if (!email) return done(null, false); // Still no email, fail gracefully

        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) return done(null, existingUser);

        const newUser = await db.user.create({
          data: {
            email,
            name: profile.displayName || profile.username,
            image: null,
            role: "USER",
          },
        });

        return done(null, newUser);
      } catch (err) {
        console.error("GitHub Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize & Deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
