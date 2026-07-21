// // require("dotenv").config();
// // const http = require("http");
// // const app = require("./app");
// // const { connectDB, sequelize } = require("./config/db");

// // require("./association");
// // require("./src/entity/user");
// // require("./src/entity/conversation");
// // require("./src/entity/conversation_member");
// // require("./src/entity/message");

// // const server = http.createServer(app);

// // require("./src/socket/socket")(server);

// // const startServer = async () => {
// //   try {
// //     await connectDB();
// //     await sequelize.sync();
// //     const PORT = process.env.PORT || 5000;
// //     server.listen(PORT, () => console.log(`Server running on ${PORT}`));
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// // startServer();

// // module.exports = { server };


// // require("dotenv").config();

// // const express = require("express");
// // const cors = require("cors");

// // const { connectDB } = require("./config/db");

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // connectDB();

// // // Routes
// // app.use("/api/users", require("./routes/userRoutes"));
// // app.use("/api/chat", require("./routes/chatRoutes"));

// // app.get("/", (req, res) => {
// //   res.send("API is running");
// // });

// // // IMPORTANT FOR VERCEL
// // module.exports = app;


// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const { connectDB, sequelize } = require("./config/db");

// require("./association");
// require("./src/entity/user");
// require("./src/entity/conversation");
// require("./src/entity/conversation_member");
// require("./src/entity/message");

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB()
//   .then(() => sequelize.sync())
//   .catch((err) => console.error("DB sync error:", err));

// app.use("/api/users", require("./src/modules/user/user.routes"));
// app.use("/api/chat", require("./src/modules/"));

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// module.exports = app;
require("dotenv").config();

const http = require("http");
const app = require("./app");

const { connectDB, sequelize } = require("./config/db");

require("./association");

require("./src/entity/user");
require("./src/entity/conversation");
require("./src/entity/conversation_member");
require("./src/entity/message");

const server = http.createServer(app);

require("./src/socket/socket")(server);

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync();

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (err) {
    console.error(err);
  }
};

startServer();
