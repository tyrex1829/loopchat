import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT || 8080;
const httpServer = app.listen(port);

const wss = new WebSocketServer({ server: httpServer });

let user = 0;

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log("Total Users: " + ++user);
  ws.send("Hello!");
});
