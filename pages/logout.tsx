import { NextPage } from "next";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

const Logout: NextPage = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("/");
  });
  return null;
};

export default Logout;
