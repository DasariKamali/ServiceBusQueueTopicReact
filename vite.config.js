//vite.config.js

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      nodePolyfills(),
    ],
    resolve: {
      alias: {
        process: 'process/browser',
      },
    },
    define: {
      'import.meta.env.VITE_QUEUE_CONNECTION_STRING': JSON.stringify(process.env.VITE_QUEUE_CONNECTION_STRING),
      'import.meta.env.VITE_TOPIC_CONNECTION_STRING': JSON.stringify(process.env.VITE_TOPIC_CONNECTION_STRING),
      'import.meta.env.VITE_QUEUE_NAME': JSON.stringify(process.env.VITE_QUEUE_NAME),
      'import.meta.env.VITE_TOPIC_NAME': JSON.stringify(process.env.VITE_TOPIC_NAME),
      'import.meta.env.VITE_SUBSCRIPTION_NAME': JSON.stringify(process.env.VITE_SUBSCRIPTION_NAME),
      'import.meta.env.VITE_TIMEOUT_IN_MS': JSON.stringify(process.env.VITE_TIMEOUT_IN_MS),
    },
  };
});
