"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var next_1 = __importDefault(require("next"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
// API内で共通で使用するコンテキスト
var context = {
    io: null,
};
var dev = process.env.NODE_ENV !== "production";
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
var requestListner = function (req, res) {
    var parsedUrl = (0, url_1.parse)(req.url, true);
    req.context = context;
    handle(req, res, parsedUrl);
};
app.prepare().then(function () {
    var port = parseInt(process.env.PORT || "3000");
    var server = (0, http_1.createServer)(requestListner);
    context.io = new socket_io_1.Server(server, {
    // cors
    // cors: {
    //   origin: ["http://xxxx"]
    // }
    });
    if (!context.io)
        return;
    context.io.on("connection", function (client) {
        console.log("connect");
        client.on("disconnect", function () {
            console.log("disconnect");
        });
    });
    server.listen(port, function () {
        console.log("> Ready on http://localhost:".concat(port));
    });
});
