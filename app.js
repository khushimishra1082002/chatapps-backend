// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const errorHandler = require("./src/middlewares/errorHandler");
// const authRoutes = require("./src/modules/auth/auth.routes");
// const userRoutes = require("./src/modules/user/user.routes");
// const profileRoutes = require("./src/modules/profile/profile.routes");
// const conversationRoutes = require("./src/modules/conversation/conversation.route");
// const messageRoutes = require("./src/modules/message/message.routes");
// const attachmentRoutes = require("./src/modules/attachment/attachment.routes");

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

// app.use(express.json());
// const fs = require("fs");
// const path = require("path");

// const uploadDir = path.join(__dirname, "public/uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// app.use("/auth", authRoutes);
// app.use("/user", userRoutes);
// app.use("/profile", profileRoutes);
// app.use("/conversation", conversationRoutes);
// app.use("/message", messageRoutes);
// app.use("/attachment", attachmentRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to chat App" });
// });

// app.use(errorHandler);

// module.exports = app;

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const errorHandler = require("./src/middlewares/errorHandler");

const authRoutes = require("./src/modules/auth/auth.routes");
const userRoutes = require("./src/modules/user/user.routes");
const profileRoutes = require("./src/modules/profile/profile.routes");
const conversationRoutes = require("./src/modules/conversation/conversation.route");
const messageRoutes = require("./src/modules/message/message.routes");
const attachmentRoutes = require("./src/modules/attachment/attachment.routes");

const allowedOrigins = [
  "http://localhost:5173",
  "https://chatapps-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

const uploadDir = path.join(__dirname, "public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);
app.use("/attachment", attachmentRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to chat App" });
});

app.use(errorHandler);

module.exports = app;
