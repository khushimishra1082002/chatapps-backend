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
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

startServer();

module.exports = { server };


