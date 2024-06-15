import express from "express";
import "dotenv/config";
import { engine } from "express-handlebars";
import fileUpload from "express-fileupload";
import session from "express-session";
import skatersRoutes from "./routes/skaters.route.js";
import path from "path";

const app = express();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
});


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 5000000 },
    useTempFiles: true,
  })
);

app.use(sessionMiddleware);

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use("/", skatersRoutes);

app.get("*", (req, res) => {
  res.status(404).render("error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));