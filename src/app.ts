import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import cors from "cors"
import { deserializeUser } from "./middleware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.options("*", (req, res) => {
    res.status(200).send("Preflight request allowed");
  });

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
