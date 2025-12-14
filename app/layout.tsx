import Header from "@/components/Header"
import { Metadata } from "next";
import './globals.css'
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Codeforces Visualizer",
  description: "Website for showing codeforces statistics",
};
export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <body>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}