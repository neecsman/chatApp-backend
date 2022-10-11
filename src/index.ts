import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import router from "./router";
import cookieParser from "cookie-parser";
import cors from "cors";
import { updateLastSeen, errorMiddleware } from "./middlewares";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    credentials: true,
    origin: "http://localhost:3001",
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);
// app.use("/", function (requset, response, next) {
//   requset.io = io;
//   next();
// });

app.use(router);
app.use(updateLastSeen);
app.use(errorMiddleware);

io.on("connection", (socket) => {
  console.log(`Пользователь ${socket.id} подключился`);
});

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
