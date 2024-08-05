import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import Navbar from "./(components)/Navbar";

const p = Plus_Jakarta_Sans({ subsets: ["latin"] });

<Head>
  <title>Not Done Yet</title>
  <meta name="description" content="Building the LinkedIn for Sports World. Our app bridges the gap between all sports professionals, creating opportunities for growth, collaboration, and success. Discover How Our Latest Initiative is Transforming the Sports Landscape" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <meta name="twitter:image" content="https://res.cloudinary.com/dexnb3wk2/image/upload/v1721478008/ndy/og_img.jpg"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="Not Done Yet"/>
  <meta name="twitter:description" content="Building the LinkedIn for Sports World. Our app bridges the gap between all sports professionals, creating opportunities for growth, collaboration, and success. Discover How Our Latest Initiative is Transforming the Sports Landscape"/>

  <meta property="og:image" content="https://res.cloudinary.com/dexnb3wk2/image/upload/v1721478008/ndy/og_img.jpg"/>
  <meta property="og:title" content="Not Done Yet"/>
  <meta property="og:description" content="Building the LinkedIn for Sports World. Our app bridges the gap between all sports professionals, creating opportunities for growth, collaboration, and success. Discover How Our Latest Initiative is Transforming the Sports Landscape"/>
  <meta property="og:type" content="website"/>
</Head>;

export const metadata: Metadata = {
  title: 'Not Done Yet',
  description: 'Building the LinkedIn for Sports World. Our app bridges the gap between all sports professionals, creating opportunities for growth, collaboration, and success. Discover How Our Latest Initiative is Transforming the Sports Landscape',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'Not Done Yet',

    description: 'Building the LinkedIn for Sports World. Our app bridges the gap between all sports professionals, creating opportunities for growth, collaboration, and success. Discover How Our Latest Initiative is Transforming the Sports Landscape',
    url: 'https://ndy-static.vercel.app',
    images: [
      {
        url: 'https://res.cloudinary.com/dexnb3wk2/image/upload/v1721478008/ndy/og_img.jpg',
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
    images: ['https://res.cloudinary.com/dexnb3wk2/image/upload/v1721478008/ndy/og_img.jpg'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={p.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}