export default function handler(req: any, res: any) {
  req.context.io.emit("receiveMessage", {
    message: req.body.message,
    name: req.body.name,
  });
  // res.status(200).json({ userName: req.body.userName });
  res.end();
}
