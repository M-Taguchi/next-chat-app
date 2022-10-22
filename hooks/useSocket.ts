import { atom, useAtom } from "jotai";
import { useState } from "react";
import { io } from "socket.io-client";

const socketAtom = atom(() => io());

const userNameAtom = atom("");

export const useSocket = () => {
  const [socket] = useAtom(socketAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  return {
    socket,
    userName,
    setUserName,
  };
};
