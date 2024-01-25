import "@/styles/globals.css"
import { Metadata } from "next"
import Head from "next/head"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import NavBar from "@/components/NavBar"

export const metadata: Metadata = {
  title: {
    default: "adminbdd",
    template: `%s-adminbdd`,
  },
  description: "site for bdd dashboard",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <title>bdd admin</title>
        </Head>
        <body className={`${fontSans.variable} container flex min-h-screen flex-col gap-8 bg-black  py-8 text-white`}>
          <NavBar />
          <div>
            {children}
          </div>
        </body>
      </html>
    </>
  )
}
