import Header from "@/components/Header"
import './globals.css'
export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <body>
        <Header></Header>

        <main>{children}</main>
      </body>
    </html>
  )
}