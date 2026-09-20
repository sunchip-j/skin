import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/app/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Modified Baumann SKIN TYPE",
    template: "%s",
  },
  description: "33개 문항으로 나의 4글자 피부 타입을 확인해보세요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5009951959536942"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
