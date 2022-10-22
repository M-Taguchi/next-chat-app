export default function handler(req: any, res: any) {
  for (let s of req.context.io.of("/").sockets) {
    let socket = s[1];
    if (socket.id === req.body.id) continue;
    socket.emit("leaveRoom", {
      userName: req.body.userName,
    });
  }

  res.status(200).json({ userName: req.body.userName });
  // res.end();
}
