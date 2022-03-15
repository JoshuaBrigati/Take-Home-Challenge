import { userData } from "../../../userData";
import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;

export default function handler (req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        error: 'Request missing username or password',
      });
    }

    const user = userData.find(user => {
      return user.username === username;
    });

    if (!user) {
      console.log('NO USER')
      res.status(400).json({ status: 'error', error: 'User Not Found' });
    }

    if (user) {
      const userUsername = user.username;
      const userPassword = password; // no password is saved for this example so I am just using the passed in password as the DB password.

      // This would actually be checking password hashes
      // with bcrypt.compare but for this example I am using a simple if statement.
      if (password === userPassword) {
        const payload = {
          ...user,
        };

        jwt.sign(
          payload,
          KEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: 'Bearer ' + token,
            });
          },
        );
      } else {
        res
          .status(400)
          .json({ status: 'error', error: 'Password incorrect' });
      }
    }
  }
}