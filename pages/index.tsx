import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import styles from "../styles/Home.module.css";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Home: NextPage = () => {
  useEffect(() => {
    socketInitializer();
  }, []);
  return (
    <div className={styles.container}>
      <button onClick={() => testEmitMessage()} />
    </div>
  );
};

const socketInitializer = async () => {
  socket = io();

  socket.on("connect", () => {
    console.log("connected");
  });

  return null;
};

const testEmitMessage = () => {
  socket.emit("test", {}, (data: any) => {
    console.log(data);
  });
};

export default Home;
