import { Kafka } from 'kafkajs';
import { config } from './config.js';

const kafka = new Kafka({
  clientId: 'mandir-reservation-hub',
  brokers: config.kafkaBrokers
});

export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({ groupId: 'reservation-service-group' });

let producerConnected = false;

export async function connectProducer() {
  if (!producerConnected) {
    await kafkaProducer.connect();
    producerConnected = true;
  }
}

let consumerConnected = false;

export async function startReservationConsumer(onMessage) {
  if (consumerConnected) return;

  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: config.reservationTopic, fromBeginning: false });

  await kafkaConsumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const parsed = JSON.parse(message.value.toString());
      await onMessage(parsed);
    }
  });

  consumerConnected = true;
}
