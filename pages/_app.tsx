import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
