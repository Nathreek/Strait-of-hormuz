import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { SimulationProvider } from "@/components/SimulationContext";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Hormuz Shield — Maritime Resilience Operations",
  description:
    "Operational intelligence for maritime disruption, route risk, supplier dependency, and alternative routing across the Hormuz and Red Sea corridor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <SimulationProvider>
          <div className="flex min-h-screen bg-abyss">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </SimulationProvider>
      </body>
    </html>
  );
}
