import { NextApiResponse } from "next";
import { SocketApiRequest } from "../../../type/api.type";

export default function handler(
  req: SocketApiRequest,
  res: NextApiResponse<{ name: string }>
) {
  for (let s of req.context.io.of("/").sockets) {
    let socket = s[1];
    if (socket.id === req.body.id) continue;
    socket.emit("leaveRoom", {
      name: req.body.name,
    });
  }

  res.status(200).end();
}
