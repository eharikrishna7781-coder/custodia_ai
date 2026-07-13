import './globals.css';

export const metadata = {
  title: 'Custodia AI - Rural Healthcare Access',
  description: 'Voice-first, multi-agent AI assistant for rural healthcare. Symptom assessment, clinic locator, ambulance booking, and medical reports in your language.',
  keywords: ['healthcare', 'rural health', 'AI assistant', 'telemedicine', 'India', 'ambulance', 'clinic locator'],
  authors: [{ name: 'Custodia AI Team' }],
  openGraph: {
    title: 'Custodia AI - Healthcare in Your Language',
    description: 'Voice-first AI healthcare assistant for rural communities',
    type: 'website',
  },
  manifest: '/manifest.json',
  themeColor: '#0D9488',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Custodia AI',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
        <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js" defer></script>

        {/* PWA Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#0D9488" />
        <meta name="msapplication-TileColor" content="#0D9488" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
