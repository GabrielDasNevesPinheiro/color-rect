export const metadata = {
  title: 'ColorRect',
  description: 'Jogue ColorRect',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}
