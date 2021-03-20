import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import "express-async-errors";
import errorHandler from "./errors/handler";
import routes from "./routes";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database.");
    app.emit("ready...");
  })
  .catch((e) => console.log(e));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(errorHandler);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
