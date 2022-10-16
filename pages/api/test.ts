export default function handler(req: any, res: any) {
  req.context.io.emit("test", { message: "abc" });
  res.end();
}
