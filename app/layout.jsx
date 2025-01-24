import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './providers/provider'
import { TrainingVideosStatusProvider } from './context/TrainingVideosContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "DCAM | Staff",
  description: "Log your teaching hours",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
          <AuthProvider>
            <TrainingVideosStatusProvider>
              {children}
            </TrainingVideosStatusProvider>
          </AuthProvider>
      </body>
    </html>
  )
}
