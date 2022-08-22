import "dotenv/config";
import express from "express";
import router from "./router";
import cookieParser from "cookie-parser";
import cors from "cors";
import { updateLastSeen, errorMiddleware } from "./middlewares";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);
app.use(updateLastSeen);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
