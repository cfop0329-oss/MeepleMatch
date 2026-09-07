import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'
import { Cinzel, Lora } from 'next/font/google'

const cinzel = Cinzel({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cinzel',
  display: 'swap',
})

const lora = Lora({
    subsets: ['latin', 'latin-ext'],
  variable: '--font-lora',  
  display: 'swap',
})

export const metadata = {
  title: 'MeepleMatch',
  description: 'Социальная сеть для настольщиков',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cinzel.variable} ${lora.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}