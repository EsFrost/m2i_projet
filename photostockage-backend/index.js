const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser"); // Add this line
const userRoute = require("./routes/userRoute");
const photoRoute = require("./routes/photoRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const likesRoute = require("./routes/likesRoute");
const downloadsRoute = require("./routes/downloadsRoute");
const commentsRoute = require("./routes/commentsRoute");
const photosCategoriesRouter = require("./routes/photos_categoriesRoute");

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://192.168.1.190:3001",
      /^http:\/\/192\.168\.1\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]+)?$/,
    ],
    credentials: true, // Allows cookies with CORS
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "UPDATE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(cookieParser()); // Uses the cookie parser

const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes) // originally 100 which is reasonable
});

app.use(limiter);

app.use("/user", userRoute);
app.use("/photos", photoRoute);
app.use("/categories", categoriesRoute);
app.use("/likes", likesRoute);
app.use("/downloads", downloadsRoute);
app.use("/comments", commentsRoute);
app.use("/photos_categories", photosCategoriesRouter);

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

module.exports = app;
