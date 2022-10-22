import { Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Room: NextPage = () => {
  const { userName } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { socket } = useSocket();

  const router = useRouter();

  useEffect(() => {
    socket.on("enterRoom", ({ userName }: { userName: string }) => {
      setMessages([...messages, `${userName}さんが入室しました`]);
    });

    socket.on("leaveRoom", ({ userName }: { userName: string }) => {
      setMessages([...messages, `${userName}さんが退室しました`]);
    });

    socket.on("receiveMessage", ({ message }: { message: string }) => {
      console.log(messages);
      setMessages([...messages, message]);
    });
  });

  const sendMessage = async () => {
    await axios.post("/api/chat/sendMessage", {
      message: inputRef.current?.value,
    });
  };

  const leaveRoom = async () => {
    await axios
      .post("/api/room/leaveRoom", {
        userName,
      })
      .then(() => {
        router.push("/");
      });
  };

  return (
    <>
      <Text>こんにちは、{userName}さん</Text>
      <Flex direction="column">
        {messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </Flex>
      <Flex gap="8">
        <FormControl>
          <Input ref={inputRef} placeholder="メッセージを入力" />
        </FormControl>
        <Button onClick={() => sendMessage()}>送信</Button>
      </Flex>
      <Button onClick={() => leaveRoom()}>退出</Button>
    </>
  );
};

export default Room;
