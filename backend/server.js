require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const roles = require("./src/routers/roles");
const auth = require("./src/routers/auth");
const user = require("./src/routers/user");
const product = require("./src/routers/product");
const chat = require("./src/routers/chat");

// const connectToDB = require("./src/database/database");
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// connectToDB();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", roles);
app.use("/auth", auth);
app.use("/user", user);
app.use("/product", product);
app.use("/chat", chat);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
