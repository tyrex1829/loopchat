import express from "express";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send({
    message: `Welcome to the server`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
