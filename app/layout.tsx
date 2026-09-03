import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THRYVE | A modern editorial platform',
  description: 'Thryve is a modern editorial media platform covering technology, science, culture, and the future of human-computer interaction.',
  openGraph: {
    title: 'THRYVE | A modern editorial platform',
    description: 'Thryve is a modern editorial media platform covering technology, science, culture, and the future of human-computer interaction.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THRYVE | A modern editorial platform',
    description: 'Thryve is a modern editorial media platform covering technology, science, culture, and the future of human-computer interaction.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-neutral-900 flex flex-col min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
