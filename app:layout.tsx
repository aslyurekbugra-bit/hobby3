import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GymMatch - Find Your Gym Buddy",
  description: "Tinder for the gym",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}