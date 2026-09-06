import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

export const metadata = {
  title: 'BoardGame Hub',
  description: 'Социальная сеть для настольщиков',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}