import { NextApiResponse } from "next";
import { SocketApiRequest } from "../../../type/api.type";

export default function handler(req: SocketApiRequest, res: NextApiResponse) {
  req.context.io.emit("receiveMessage", {
    message: req.body.message,
    name: req.body.name,
  });
  res.end();
}
