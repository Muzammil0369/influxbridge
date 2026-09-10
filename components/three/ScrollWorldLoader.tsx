"use client";

import dynamic from "next/dynamic";

const ScrollWorld = dynamic(
  () => import("./ScrollWorld"),
  {
    ssr: false, // This tells Next.js NOT to render this on the server
    loading: () => null,
  }
);

export default function ScrollWorldLoader() {
  return <ScrollWorld />;
}