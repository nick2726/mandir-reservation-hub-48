export const config = {
  gatewayPort: Number(process.env.GATEWAY_PORT || 4000),
  authPort: Number(process.env.AUTH_SERVICE_PORT || 4001),
  reservationPort: Number(process.env.RESERVATION_SERVICE_PORT || 4002),
  jwtSecret: process.env.JWT_SECRET || 'replace-with-secure-secret',
  kafkaBrokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  reservationTopic: process.env.KAFKA_RESERVATION_TOPIC || 'reservation-events'
};
