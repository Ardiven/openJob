import amqplib from 'amqplib';
import process from 'process';
import { Buffer } from 'buffer';

const QUEUE_NAME = 'application_notifications';


let connection = null;
let channel = null;

const getChannel = async () => {
    if (!channel) {
        const url = process.env.RABBITMQ_URL;
        connection = await amqplib.connect(url);
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
    }
    return channel;
};

const publishApplication = async (applicationId) => {
    try {
        const ch = await getChannel();
        const payload = JSON.stringify({ application_id: applicationId });
        ch.sendToQueue(QUEUE_NAME, Buffer.from(payload), { persistent: true });
        console.log(`[Publisher] Sent application_id: ${applicationId}`);
    } catch (error) {
        // Jangan crash API jika RabbitMQ tidak tersedia
        console.error('[Publisher] Failed to publish:', error.message);
    }
};

export default { publishApplication, QUEUE_NAME };
