import express from 'express';
import { randomUUID } from 'node:crypto';
import { config } from '../common/config.js';
import { authMiddleware } from '../common/jwt.js';
import { connectProducer, kafkaProducer, startReservationConsumer } from '../common/kafka.js';

const app = express();
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'reservation-service' });
});

app.post('/reservations', authMiddleware, async (req, res) => {
  const { templeId, sevaType, date } = req.body;

  if (!templeId || !sevaType || !date) {
    return res.status(400).json({ error: 'templeId, sevaType and date are required' });
  }

  const event = {
    eventId: randomUUID(),
    type: 'reservation.created',
    createdAt: new Date().toISOString(),
    payload: {
      reservationId: randomUUID(),
      userId: req.user.sub,
      templeId,
      sevaType,
      date
    }
  };

  await connectProducer();
  await kafkaProducer.send({
    topic: config.reservationTopic,
    messages: [{ key: event.payload.reservationId, value: JSON.stringify(event) }]
  });

  return res.status(201).json({ message: 'Reservation created', event });
});

startReservationConsumer(async (event) => {
  console.log('[reservation-service] consumed event:', event.type, event.payload?.reservationId);
}).catch((error) => {
  console.error('Failed to start reservation consumer:', error);
});

app.listen(config.reservationPort, () => {
  console.log(`Reservation service listening on ${config.reservationPort}`);
});
