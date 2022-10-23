export default function handler(req: any, res: any) {
  for (let s of req.context.io.of("/").sockets) {
    let socket = s[1];
    if (socket.id === req.body.id) continue;
    socket.emit("leaveRoom", {
      name: req.body.name,
    });
  }

  res.status(200).json({ name: req.body.name });
  // res.end();
}
