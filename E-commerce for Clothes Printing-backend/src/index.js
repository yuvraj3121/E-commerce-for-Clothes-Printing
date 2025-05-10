import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import connectDB from "./dataBase/index.DB.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongoDB connection fail !!", err);
  });
