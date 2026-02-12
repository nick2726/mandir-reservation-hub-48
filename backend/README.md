# Mandir Reservation Microservices Backend

This backend adds three Node.js microservices with Kafka eventing and JWT authentication:

- **API Gateway** (`:4000`) – single entry point for clients.
- **Auth Service** (`:4001`) – issues JWT tokens.
- **Reservation Service** (`:4002`) – validates JWT and publishes reservation events to Kafka.

## 1) Install dependencies

```bash
cd backend
npm install
```

## 2) Start Kafka (Redpanda)

```bash
docker compose up -d
```

## 3) Configure env

```bash
cp .env.example .env
```

## 4) Run services in separate terminals

```bash
npm run start:auth
npm run start:reservation
npm run start:gateway
```

## 5) Test flow

Generate token:

```bash
curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"userId":"user-123","role":"devotee"}'
```

Create reservation using token:

```bash
curl -s -X POST http://localhost:4000/api/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{"templeId":"tirupati","sevaType":"archana","date":"2026-03-01"}'
```

If successful, the reservation service publishes a `reservation.created` event to Kafka and logs consumed events.
