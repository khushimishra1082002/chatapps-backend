// require("dotenv").config();
// const { Sequelize } = require("sequelize");

// console.log("process.env.DB_NAME", process.env.DB_NAME);

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   process.env.CLOUDINARY_CLOUD_NAME,
//   process.env.CLOUDINARY_API_KEY,
//   process.env.CLOUDINARY_API_SECRET,
//   {
//     host: process.env.DB_HOST || "localhost",
//     dialect: "mysql",
//     logging: false,
//   },
// );

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected successfully");
//   } catch (err) {
//     console.error("Unable to connect database", err);
//     process.exit(1);
//   }
// };

// module.exports = { sequelize, connectDB };
require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("DB:", process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

module.exports = {
  sequelize,
  connectDB,
};
