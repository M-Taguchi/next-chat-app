import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, _] = useState(() => io());
  const socketInitializer = async () => {
    socket.on("connect", () => {
      console.log("client connected");
    });

    socket.on("test", ({ message }) => {
      setMessages([...messages, message]);
    });

    return null;
  };
  useEffect(() => {
    socketInitializer();
  });

  const testEmitMessage = async () => {
    await fetch("/api/test");
  };

  return (
    <div className={styles.container}>
      <button onClick={() => testEmitMessage()}>テスト</button>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default Home;
