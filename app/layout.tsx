import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NXT WRLD - Premium Streetwear Collection",
  description: "Discover the future of streetwear with NXT WRLD. Premium hoodies, t-shirts, and exclusive drops.",
  keywords: ["streetwear", "fashion", "hoodies", "premium clothing", "NXT WRLD"],
  authors: [{ name: "NXT WRLD" }],
  creator: "NXT WRLD",
  publisher: "NXT WRLD",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nxtwrldoff.vercel.app",
    title: "NXT WRLD - Premium Streetwear Collection",
    description: "Discover the future of streetwear with NXT WRLD. Premium hoodies, t-shirts, and exclusive drops.",
    siteName: "NXT WRLD",
    images: [
      {
        url: "/images/logonxtwrld.png",
        width: 1200,
        height: 630,
        alt: "NXT WRLD Logo",
      },
      {
        url: "/images/nxtwrldhoodie.webp",
        width: 1200,
        height: 630,
        alt: "NXT WRLD Premium Hoodie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NXT WRLD - Premium Streetwear Collection",
    description: "Discover the future of streetwear with NXT WRLD. Premium hoodies, t-shirts, and exclusive drops.",
    creator: "@nxtwrld.wear",
    images: ["/images/logonxtwrld.png"],
  },
  icons: {
    icon: "/images/logonxtwrld.png",
    shortcut: "/images/logonxtwrld.png",
    apple: "/images/logonxtwrld.png",
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="page-wrapper">
            <div className="content-wrapper">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
