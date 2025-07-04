import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NXT WRLD - Premium Streetwear Collection",
  description:
    "Discover the future of streetwear with NXT WRLD. Premium hoodies, t-shirts, and exclusive drops. Step into the next world of fashion.",
  keywords: ["streetwear", "fashion", "hoodies", "t-shirts", "premium clothing", "NXT WRLD", "urban fashion"],
  authors: [{ name: "NXT WRLD" }],
  creator: "NXT WRLD",
  publisher: "NXT WRLD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nxtwrldoff.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NXT WRLD - Premium Streetwear Collection",
    description:
      "Discover the future of streetwear with NXT WRLD. Premium hoodies, t-shirts, and exclusive drops. Step into the next world of fashion.",
    url: "https://nxtwrldoff.vercel.app",
    siteName: "NXT WRLD",
    images: [
      {
        url: "/images/logonxtwrld.png",
        width: 1200,
        height: 630,
        alt: "NXT WRLD Logo - Premium Streetwear Brand",
      },
      {
        url: "/images/nxtwrldhoodie.webp",
        width: 1200,
        height: 630,
        alt: "NXT WRLD Premium Hoodie Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NXT WRLD - Premium Streetwear Collection",
    description: "Discover the future of streetwear with NXT WRLD. Premium hoodies, t-shirts, and exclusive drops.",
    images: ["/images/logonxtwrld.png"],
    creator: "@nxtwrld.wear",
    site: "@nxtwrld.wear",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logonxtwrld.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logonxtwrld.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
