"use client";

import dynamic from "next/dynamic";

const ScrollWorld = dynamic(() => import("./ScrollWorld"), {
  ssr: false,
  loading: () => null,
});

export default function ScrollWorldLoader() {
  return <ScrollWorld />;
}