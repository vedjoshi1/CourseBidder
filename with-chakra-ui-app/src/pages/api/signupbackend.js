// pages/api/signupbackend.js

import { addUser as addUserAlias } from '../../mongoConnect.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Call the addUser function from mongoConnect.js
      await addUserAlias(username, password);

      res.status(200).json({ message: 'User successfully added!' });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}