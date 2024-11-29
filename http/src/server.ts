import express from "express";
import env from "dotenv";
env.config();
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET: any = process.env.JWT_SECRET;

let users: any = [];

function authChecker(req: any, res: any, token: any, next: any) {
  if (token) {
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: `Welcome to the server`,
  });
});

app.post("/signup", (req, res): any => {
  try {
    const { username, password } = req.body;
    const user = users.find((u: any) => u.username === username);

    if (user) {
      return res.status(403).json({
        message: `User with username already exists`,
      });
    }

    const newUser = {
      username,
      password,
    };

    users.push(newUser);
  } catch (error) {
    return res.status(500).json({
      message: `Can't signup right now, pls try again.`,
    });
  }
});

app.post("/signin", (req, res): any => {
  try {
    const { username, password } = req.body;
    const user = users.filter(
      (u: any) => u.username === username && u.password === password
    );

    const token = jwt.sign(
      {
        username: user.username,
      },
      JWT_SECRET
    );
    if (user) {
      user.token = token;
    }

    return res.status(200).json(`User successfully signed-in`);
  } catch (error) {
    return res.status(500).json({
      message: `Can't signin right now, pls try again.`,
    });
  }
});

app.get("/messages", authChecker, (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
