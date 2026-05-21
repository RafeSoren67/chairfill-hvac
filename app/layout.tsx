import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChairFill | HVAC Missed-Call Recovery",
  description:
    "ChairFill helps HVAC companies recover missed calls, follow up automatically, and turn service calls, estimates, and installs into booked jobs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
