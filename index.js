// import "dotenv/config";
import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.route.js";
import transferRoutes from "./routes/transfer.route.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/usuarios", usersRoutes);
app.use("/transferencias", transferRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Solar Bank App esta atenta en el puerto: ${PORT}`);
});
