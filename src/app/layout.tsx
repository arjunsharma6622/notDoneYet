import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Not Done Yet',
  description: 'Building the LinkedIn for Sports World. Our app bridges the gap between all sports professionals, creating opportunities for growth, collaboration, and success. Discover How Our Latest Initiative is Transforming the Sports Landscape',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'Not Done Yet',
    description: 'Building the LinkedIn for Sports World. Our app bridges the gap between all sports professionals, creating opportunities for growth, collaboration, and success. Discover How Our Latest Initiative is Transforming the Sports Landscape',
    url: 'https://notdoneyet.in',
    images: [
      {
        url: process.env.OG_IMAGE || 'https://res.cloudinary.com/dexnb3wk2/image/upload/v1721478008/ndy/og_img.jpg',
        width: 1200,
        height: 630,
        alt: 'Not Done Yet',
      },
    ],
    siteName: 'Not Done Yet',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Not Done Yet',
    description: 'Building the LinkedIn for Sports World. Our app bridges the gap between all sports professionals, creating opportunities for growth, collaboration, and success. Discover How Our Latest Initiative is Transforming the Sports Landscape',
    images: [process.env.OG_IMAGE || 'https://res.cloudinary.com/dexnb3wk2/image/upload/v1721478008/ndy/og_img.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster richColors={true} position="bottom-center" duration={2000} />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}