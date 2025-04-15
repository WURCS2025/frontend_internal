import { useEffect, useState } from "react";

export interface SseMessage {
  id: string;
  result: string;
  message: string;
}

export const useSseMessages = (api: string) => {
  const [messages, setMessages] = useState<SseMessage[]>([]);

  useEffect(() => {
    const source = new EventSource(api);

    source.onmessage = (event) => {
      try {
        const msg: SseMessage = JSON.parse(event.data);
        console.log("Received SSE message:", msg);
        setMessages((prev) => [...prev, msg]);
      } catch (e) {
        console.error("Invalid SSE message", event.data);
      }
    };

    return () => {
      source.close();
    };
  }, []);

  console.log("SSE Messages:", messages);
  return messages;
};
