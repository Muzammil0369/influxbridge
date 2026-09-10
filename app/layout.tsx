import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InfluxBridge — Web3 Growth Infrastructure",
  description:
    "InfluxBridge connects Web3 companies with creators, communities and growth opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#02050f] text-white antialiased">{children}</body>
    </html>
  );
}