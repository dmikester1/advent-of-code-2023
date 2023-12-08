import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

const options = {
  origin: "http://localhost:3300",
};
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Hello from Node.js server");
});

app.use(routes);

const serverType =
  process.env.NODE_ENV === "production" ? "Production" : "Test";

const port = Number.parseInt(process.env.PORT, 10) || 3001;

const server = app.listen(port, () => {
  console.log(
    `${serverType} Node server and websocket server are both up on port: ${port}`,
  );
});
