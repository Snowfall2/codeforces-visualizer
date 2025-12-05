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
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}