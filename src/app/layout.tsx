import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/styles/globals.css'
import { Box, Container } from '@mui/material'
import Header from '@/layout/header'

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
                </Box>
            </body>
        </html>
    )
}
