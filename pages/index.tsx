import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { socket, setUserName } = useSocket();
  const router = useRouter();

  const enterRoom = async () => {
    if (!inputRef.current || !inputRef.current.value) {
      alert("ユーザ名が空です。");
      return;
    }
    await axios
      .post("/api/room/enterRoom", {
        id: socket.id,
        userName: inputRef.current.value,
      })
      .then((res) => {
        setUserName(res.data.userName);
        router.push("/room");
      });
  };

  return (
    <Center h="100%">
      <Box bg="white" border="1px solid black" p="8">
        <Flex gap="8" direction="column">
          <FormControl>
            <FormLabel>ユーザ名</FormLabel>
            <Input ref={inputRef} />
          </FormControl>
          <Button onClick={() => enterRoom()}>入室</Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default Home;
