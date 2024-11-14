/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_QUEUE_CONNECTION_STRING: string;
    readonly VITE_TOPIC_CONNECTION_STRING: string;
    readonly VITE_QUEUE_NAME: string;
    readonly VITE_TOPIC_NAME: string;
    readonly VITE_SUBSCRIPTION_NAME: string;
    readonly VITE_TIMEOUT_IN_MS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
