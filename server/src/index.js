const express = require("express");
const http = require("http");
const ws = require("ws");

const app = express();

app.get("/", (req, res) => {
    console.log(req.headers);
    res.send("hello world");
});

const PORT = +process.env.PORT || 5000;

/* ws */
const wss = new ws.WebSocketServer({ noServer: true });
const server = http.createServer(app);

server.on("upgrade", function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit("connection", ws, request);
    });
});

wss.on("connection", function connection(ws) {
    console.log("A new client connected");
    ws.send("Connected !!");

    ws.on("message", function (data, isBinary) {
        const message = data.toString();
        console.log("received msg: " + message + " \nechoing back ...");
        ws.send("Echo: " + message);
    });
});
server.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`);
});
