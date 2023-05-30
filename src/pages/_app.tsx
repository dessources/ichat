import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ContextProvider from "@/components/providers/ContextProvider";
import { ChatContext } from "@/contexts";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider context={ChatContext}>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
