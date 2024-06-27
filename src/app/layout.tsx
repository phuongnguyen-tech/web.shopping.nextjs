import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Box, Container } from '@mui/material'
import Header from '@/layout/header'
import Footer from '@/layout/footer'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Website Shopping',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Box>
                    <Header />
                    <Container>{children}</Container>
                    <Footer />
                </Box>
            </body>
        </html>
    )
}
