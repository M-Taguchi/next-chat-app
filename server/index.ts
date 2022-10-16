import { parse } from "url";
import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";

// API内で共通で使用するコンテキスト
const context: {
  io: null | Server;
} = {
  io: null,
};

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const requestListner = (req: any, res: any) => {
  const parsedUrl = parse(req.url, true);
  req.context = context;
  return handle(req, res, parsedUrl);
};

app.prepare().then(() => {
  const port = parseInt(process.env.PORT || "3000");

  const server = createServer(requestListner);

  context.io = new Server(server, {
    // cors
    // cors: {
    //   origin: ["http://xxxx"]
    // }
  });
  if (!context.io) return;
  context.io.on("connect", (client) => {
    console.log("server connected");
    client.on("disconnect", () => {
      console.log("server disconnected");
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
