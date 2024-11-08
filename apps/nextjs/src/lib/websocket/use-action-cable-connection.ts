import { useRef, useState, useCallback, useEffect } from "react";
import {
  createConsumer
  
  
  
} from "@rails/actioncable";
import type {Consumer, Subscription, Mixin} from "@rails/actioncable";

type SubscriptionConnection<M> = Subscription<Consumer> &
  Mixin & {
    connected(): void;
    disconnected(): void;
    received(data: M): void;
  };

const maxReconnectAttempts = 5;

export function useActionCableConnection<M extends object, S extends object>(
  websocketUrl: string,
  channelName: string,
  roomName: string | number,
) {
  const cableRef = useRef<Consumer | null>(null);
  const connectionRef = useRef<SubscriptionConnection<M> | null>(null);

  // TODO: manage message history
  const [messages, setMessages] = useState<M[]>([]);
  const [channel, setChannel] = useState<string | null | undefined>(
    channelName,
  );
  const [room, setRoom] = useState<string | number | null | undefined>(
    roomName,
  );

  const subscribe = useCallback(
    (channelName?: string, roomName?: string) => {
      if (channelName) {
        setChannel(channelName);
      }
      if (roomName) {
        setRoom(roomName);
      }
    },
    [setChannel, setRoom],
  );

  const sendMessage = useCallback((speakData: S, onSuccess?: () => void) => {
    if (!connectionRef.current) {
      throw new Error("Connection not established");
    } else if (connectionRef.current.perform("speak", speakData)) {
      if (onSuccess) {
        onSuccess();
      }

      return true;
    }
  }, []);

  const connectToCable = useCallback(
    (
      channelName?: string | null,
      roomName?: string | null,
      shouldReconnect = true,
    ) => {
      if (!channelName || !roomName) {
        console.warn("Channel or room not set");  

        return;
      }

      // Create a consumer
      const cable = createConsumer(websocketUrl);

      cableRef.current = cable;

      let reconnectAttempts = 0;

      // Create a subscription to the chat channel
      const subscription = cable.subscriptions.create(
        { channel: channelName, room: roomName },
        {
          connected() {
            console.info("Connected to the chat channel");  
          },
          rejected() {
            console.info("Rejected from the chat channel");  
          },
          disconnected() {
            console.info("Disconnected from the chat channel");  
            // Attempt to reconnect after a delay, but only if it's not a reconnect attempt
            if (shouldReconnect) {
              const attemptReconnect = () => {
                if (reconnectAttempts < maxReconnectAttempts) {
                  reconnectAttempts++;
                  setTimeout(() => {
                    console.info(`Reconnect attempt ${reconnectAttempts}`);  
                    connectToCable(channelName, roomName, false);
                  }, 5000);
                } else {
                  console.warn("Max reconnect attempts reached");  
                }
              };

              attemptReconnect();
            }
          },
          received(data: M) {
            console.info("Received message", data);  
            setMessages((prevMessages) => [...prevMessages, data]);
          },
        },
      );

      connectionRef.current = subscription;
    },
    [websocketUrl],
  );

  useEffect(() => {
    connectToCable(channel, `${room}`);

    // Cleanup subscription on component unmount
    return () => {
      if (connectionRef.current) {
        connectionRef.current.unsubscribe();
      }
      if (cableRef.current) {
        cableRef.current.disconnect();
      }
    };
  }, [channel, room, connectToCable]);

  return { messages, sendMessage, subscribe, connectToCable };
}
