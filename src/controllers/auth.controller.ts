import { Request, Response } from 'express';
import { loginUser } from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(username, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
