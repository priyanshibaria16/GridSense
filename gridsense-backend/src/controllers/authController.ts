import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gridsense_secret_jwt_key_2026';

const DEMO_USERS = [
  { id: 'usr-admin-01', name: 'Eleanor Vance', email: 'admin@gridsense.ai', role: 'ADMIN', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 'usr-op-02', name: 'Marcus Chen', email: 'operator@gridsense.ai', role: 'OPERATOR', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 'usr-an-03', name: 'Dr. Sarah Jenkins', email: 'analyst@gridsense.ai', role: 'ANALYST', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }
];

export const authController = {
  async login(req: Request, res: Response) {
    const { email } = req.body;
    const user = DEMO_USERS.find((u) => u.email.toLowerCase() === (email || '').toLowerCase()) || DEMO_USERS[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ user, token });
  },

  async me(req: Request, res: Response) {
    res.json(DEMO_USERS[0]);
  }
};
