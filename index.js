import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/db.utils.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: "GET, POST, PUT, DELETE",
  })
);
app.use(cookieParser());

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRoutes);

dbConnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
