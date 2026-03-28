"use client";

import Script from "next/script";

export default function TawkChat() {
  return (
    <Script
      id="tawk-to"
      strategy="lazyOnload"
      src="https://embed.tawk.to/69c860c0a553521c36a635ec/1jkrbjsc1"
      crossOrigin="anonymous"
    />
  );
}
