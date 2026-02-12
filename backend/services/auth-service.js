import express from 'express';
import { config } from '../common/config.js';
import { signAccessToken } from '../common/jwt.js';

const app = express();
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

app.post('/login', (req, res) => {
  const { userId, role = 'devotee' } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const token = signAccessToken({ sub: userId, role });
  return res.json({ accessToken: token, tokenType: 'Bearer', expiresIn: 3600 });
});

app.listen(config.authPort, () => {
  console.log(`Auth service listening on ${config.authPort}`);
});
