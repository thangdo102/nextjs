import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <p
        style={{ marginBottom: 50, fontSize: 24, color: "gray", marginTop: 40 }}
      >
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Thang's Kitchen
      </p>
      <Component {...pageProps} />
    </div>
  );
}
