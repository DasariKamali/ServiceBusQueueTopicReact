//AzureServiceBusComponent.jsx 

import React, { useState } from 'react';
import { ServiceBusClient } from '@azure/service-bus';
import { setLogLevel } from '@azure/logger';

setLogLevel('verbose');
const safeTrim = (value) => (value || '').trim();
const queueConnectionString = safeTrim(import.meta.env.VITE_QUEUE_CONNECTION_STRING);
const topicConnectionString = safeTrim(import.meta.env.VITE_TOPIC_CONNECTION_STRING);
const queueName = safeTrim(import.meta.env.VITE_QUEUE_NAME);
const topicName = safeTrim(import.meta.env.VITE_TOPIC_NAME);
const subscriptionName = safeTrim(import.meta.env.VITE_SUBSCRIPTION_NAME);
const timeOutInMs = Number(import.meta.env.VITE_TIMEOUT_IN_MS) || 60000;

function AzureServiceBusComponent() {
  const [responseMessage, setResponseMessage] = useState('');
  const [receivedQueueMessages, setReceivedQueueMessages] = useState([]);
  const [receivedTopicMessages, setReceivedTopicMessages] = useState([]);
  if (!queueConnectionString || !topicConnectionString) {
    console.error("Azure Service Bus connection strings are not defined.");
    return null;
  }

  const queueClient = new ServiceBusClient(queueConnectionString, {
    retryOptions: {
      timeoutInMs: timeOutInMs,
    },
  });

  const topicClient = new ServiceBusClient(topicConnectionString, {
    retryOptions: {
      timeoutInMs: timeOutInMs,
    },
  });

  const queueSender = queueClient.createSender(queueName);
  const topicSender = topicClient.createSender(topicName);

  const sendMessageToQueue = async () => {
    try {
      await queueSender.sendMessages({ body: 'Hello Kamali, sent to Queue!' });
      setResponseMessage('Message sent to queue successfully!');
    } catch (error) {
      console.error('Error sending message to queue:', error);
    }
  };

  const sendMessageToTopic = async () => {
    try {
      await topicSender.sendMessages({ body: 'Hello Kamali, sent to Topic!' });
      setResponseMessage('Message sent to topic successfully!');
    } catch (error) {
      console.error('Error sending message to topic:', error);
    }
  };

  const receiveMessagesFromQueue = async () => {
    const receiver = queueClient.createReceiver(queueName, { receiveMode: 'receiveAndDelete' });
    try {
      const messages = await receiver.receiveMessages(5);
      const newMessages = messages.map((msg) => msg.body);
      setReceivedQueueMessages((prev) => [...prev, ...newMessages]);
    } catch (error) {
      console.error('Error receiving messages from queue:', error);
    } finally {
      await receiver.close();
    }
  };

  const receiveMessagesFromTopic = async () => {
    const receiver = topicClient.createReceiver(topicName, subscriptionName, { receiveMode: 'receiveAndDelete' });
    try {
      const messages = await receiver.receiveMessages(5);
      const newMessages = messages.map((msg) => msg.body);
      setReceivedTopicMessages((prev) => [...prev, ...newMessages]);
    } catch (error) {
      console.error('Error receiving messages from topic:', error);
    } finally {
      await receiver.close();
    }
  };

  return (
    <div>
      <h2>Azure Service Bus</h2>
      <button onClick={sendMessageToQueue}>Send Message to Queue</button>
      <button onClick={sendMessageToTopic}>Send Message to Topic</button>
      {responseMessage && <p>{responseMessage}</p>}

      <div>
        <h3>Received Queue Messages</h3>
        <button onClick={receiveMessagesFromQueue}>Receive Messages from Queue</button>
        <ul>
          {receivedQueueMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Received Topic Messages</h3>
        <button onClick={receiveMessagesFromTopic}>Receive Messages from Topic</button>
        <ul>
          {receivedTopicMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AzureServiceBusComponent;
