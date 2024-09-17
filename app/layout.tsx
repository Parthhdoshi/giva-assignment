"use client";
import localFont from "next/font/local";
import "./globals.css";
import { RecoilRoot } from "recoil";
import Header from "./components/Headers";
import { QueryClient, QueryClientProvider } from "react-query";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Header />
            {children}
          </RecoilRoot>
        </QueryClientProvider>
      </body>
    </html>
  );
}
