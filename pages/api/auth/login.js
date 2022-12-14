/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function (req, res) {
  const { username, password } = req.body;

  // Check in the database
  // if a user with this username
  // and password exists
  if (username === "Admin" && password === "Admin") {
    const token = sign(
      {
        exp: 5, // 30 days
        username: username,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: "development" !== "development",
      sameSite: "strict",
      maxAge: 5,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });
  } else {
    res.json({ message: "Invalid credentials!" });
  }
}
