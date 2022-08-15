import { UserController, DialogsController } from "./controllers";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const User = new UserController();
const Dialogs = new DialogsController();

app.get("/user/:id", User.getUserById);
app.delete("/user/:id", User.deleteUser);
app.post("/user/registration", User.createUser);

app.get("/dialogs/:id", Dialogs.getDialogs);
app.post("/dialogs", Dialogs.createDialogs);
app.delete("/dialogs/:id", Dialogs.deleteDialog);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
