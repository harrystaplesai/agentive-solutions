import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Agentive Solutions | AI Systems That Run Your Operations",
    template: "%s | Agentive Solutions",
  },
  description:
    "We build AI automation systems for document intelligence, workflow orchestration, lead generation, and custom software. Real systems, measurable results.",
  metadataBase: new URL("https://agentivesolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Agentive Solutions",
    title: "Agentive Solutions | AI Systems That Run Your Operations",
    description:
      "We build AI automation systems for document intelligence, workflow orchestration, lead generation, and custom software.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentive Solutions",
    description:
      "AI automation systems that run your operations. Document intelligence, workflow automation, lead generation, custom software.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-primary text-fg-primary font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Agentive Solutions",
              url: "https://agentivesolutions.com",
              description:
                "AI automation agency building production systems for document intelligence, workflow automation, lead generation, and custom software.",
              foundingDate: "2025",
              serviceType: [
                "AI Document Intelligence",
                "Workflow Automation",
                "AI Lead Generation",
                "Custom AI Software Development",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
