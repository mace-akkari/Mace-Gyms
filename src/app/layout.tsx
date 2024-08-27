import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import StopWatch from "./stopwatch/page";

export const metadata: Metadata = {
  title: "Mace Gyms",
  description: "The only gym app you will need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1>Mace Gyms</h1>
        <nav>
          <menu>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/search">Search</Link>
            </li>
            <li>
              <Link href="/stopwatch">Stopwatch</Link>
            </li>
          </menu>
        </nav>
        {children}
      </body>
    </html>
  );
}
