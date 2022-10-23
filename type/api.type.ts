import { NextApiRequest } from "next";
import { Server } from "socket.io";

export type SocketApiRequest = NextApiRequest & {
  context: {
    io: Server;
  };
};
