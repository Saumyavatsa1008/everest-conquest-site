"use client";

/**
 * /how-to-play — landing target for the QR code printed on the game boxes.
 *
 * The printed QR encodes https://everestconquest.com/how-to-play (a path), but
 * the actual content lives in the #how-to-play section on the homepage. Since
 * the boxes are already printed and can't be changed, this route forwards
 * visitors to that section. Uses a client redirect (works in every browser /
 * QR scanner) with a plain <a> fallback for JS-disabled clients.
 */

import { useEffect } from "react";

export default function HowToPlayRedirect() {
  useEffect(() => {
    window.location.replace("/#how-to-play");
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
        textAlign: "center",
        background: "var(--dusk-1, #0b2138)",
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p style={{ fontSize: "1.25rem", opacity: 0.9 }}>
        Taking you to How&nbsp;to&nbsp;Play…
      </p>
      <a
        href="/#how-to-play"
        style={{
          color: "var(--gold, #ffc24b)",
          fontWeight: 600,
          textDecoration: "underline",
        }}
      >
        Tap here if you are not redirected
      </a>
    </main>
  );
}
