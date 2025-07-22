import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../libs/db.js";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await db.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (existingUser) return done(null, existingUser);

        const newUser = await db.user.create({
          data: {
            email: profile.emails[0].value,
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

// Serialize & deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await db.user.findUnique({ where: { id } });
  done(null, user);
});
