import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Room: NextPage = () => {
  const { userName } = useSocket();
  const [messages, setMessages] = useState<
    { message: string; userName: string }[]
  >([]);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const { socket } = useSocket();

  const router = useRouter();

  useEffect(() => {
    socket.on("enterRoom", ({ userName }: { userName: string }) => {
      setMessages([
        ...messages,
        { message: `${userName}さんが入室しました`, userName: "" },
      ]);
    });

    socket.on("leaveRoom", ({ userName }: { userName: string }) => {
      setMessages([
        ...messages,
        { message: `${userName}さんが退室しました`, userName: "" },
      ]);
    });

    socket.on(
      "receiveMessage",
      ({ message, userName }: { message: string; userName: string }) => {
        setMessages([...messages, { message, userName }]);
      }
    );
  });

  const sendMessage = async () => {
    if (!inputRef.current || !inputRef.current.value) {
      alert("メッセージを入力してください");
      return;
    }
    await axios.post("/api/chat/sendMessage", {
      message: inputRef.current?.value,
      userName,
    });
    inputRef.current.value = "";
  };

  const leaveRoom = async () => {
    await axios
      .post("/api/room/leaveRoom", {
        id: socket.id,
        userName,
      })
      .then(() => {
        router.push("/logout");
      });
  };

  return (
    <>
      <Box p="16" width="100%" height="100%">
        {/* 入力エリア */}
        <Text>こんにちは、{userName}さん</Text>
        <Flex gap="8" width="50%">
          <Flex width="100%">
            <FormControl>
              <Textarea ref={inputRef} placeholder="メッセージを入力" />
            </FormControl>
            <Button onClick={() => sendMessage()}>送信</Button>
          </Flex>
          <Button onClick={() => leaveRoom()}>退出</Button>
        </Flex>
        {/* メッセージエリア */}
        <Flex
          direction="column"
          border="1px solid black"
          borderRadius="6"
          p="4"
          height="500"
          overflow="auto"
          my="4"
        >
          <Flex gap="4" direction="column">
            {messages.map(({ message, userName }, index) => (
              <div key={index}>
                <Text>{userName}</Text>
                <Box
                  border="1px solid black"
                  borderRadius="6"
                  maxWidth="50%"
                  width="fit-content"
                  p="2"
                >
                  <Text>{message}</Text>
                </Box>
              </div>
            ))}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Room;
