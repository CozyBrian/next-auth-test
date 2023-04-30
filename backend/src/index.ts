require('dotenv').config();
import http from "http";
import app from "./app";
import MongoInit from "./mongo";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

function startServer() {
  server.listen(PORT, () => {
    MongoInit();
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
