const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("WebSocket server is running.");
});

wss.on("connection", (ws, req) => {
  console.log("New connection");

  ws.on("message", (message) => {
    console.log("Received:", message);
    // Echo the message back
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
