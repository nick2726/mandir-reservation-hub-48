import express from 'express';
import { config } from '../common/config.js';
import { authMiddleware } from '../common/jwt.js';

const app = express();
app.use(express.json());

const authServiceBase = `http://localhost:${config.authPort}`;
const reservationServiceBase = `http://localhost:${config.reservationPort}`;

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

app.post('/auth/login', async (req, res) => {
  const response = await fetch(`${authServiceBase}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req.body)
  });

  const body = await response.json();
  res.status(response.status).json(body);
});

app.post('/api/reservations', authMiddleware, async (req, res) => {
  const response = await fetch(`${reservationServiceBase}/reservations`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: req.headers.authorization
    },
    body: JSON.stringify(req.body)
  });

  const body = await response.json();
  res.status(response.status).json(body);
});

app.listen(config.gatewayPort, () => {
  console.log(`API gateway listening on ${config.gatewayPort}`);
});
