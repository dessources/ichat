import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ContextProvider from "@/components/providers/ContextProvider";
import { AuthContext } from "@/contexts";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider context={AuthContext}>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
