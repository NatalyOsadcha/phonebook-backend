const app = require("./app");

const mongoConnectDB = require("./db/connection");

const { PORT } = process.env;

const startServer = async () => {
  try {
    await mongoConnectDB();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
