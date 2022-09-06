import express from "express";
import config from "config";
import { connectToDB } from "./mongodb/connection";
import router from "./routes";

const app = express();

connectToDB()
  .then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);

    app.listen(config.get("API_PORT"), () => {
      console.log(`Server started on port: ${config.get("API_PORT")}`);
    });
  })
  .catch((err) => {
    console.log("Faild to connect to the DB ", err);
    process.exit(1);
  });
