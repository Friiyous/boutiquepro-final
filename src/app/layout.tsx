import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "BoutiquePro.ci - Votre Boutique en Ligne en 5 Minutes",
    template: "%s | BoutiquePro.ci"
  },
  description: "La plateforme e-commerce n°1 en Côte d'Ivoire. Vendez partout avec Orange Money, MTN MoMo, Wave et profitez d'une logistique intégrée.",
  openGraph: {
    title: "BoutiquePro.ci - Vendez en ligne simplement",
    description: "Créez votre boutique, gérez vos stocks et vendez partout en Côte d'Ivoire.",
    url: 'https://boutiquepro.ci',
    siteName: 'BoutiquePro.ci',
    locale: 'fr_CI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BoutiquePro.ci - L'e-commerce Ivoirien",
    description: "Créez votre boutique en ligne en 5 minutes et vendez partout en Côte d'Ivoire. La solution e-commerce locale, simple et rapide.",
  },
  keywords: ['e-commerce', 'Côte d\'Ivoire', 'vendre en ligne', 'boutique', 'ivoirien', 'business'],
  manifest: '/manifest.json',
  themeColor: '#FF6B35',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </AuthProvider>
        <footer className="py-12 border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-gray-500">
            <p className="font-bold text-boutique-dark mb-4">BoutiquePro.ci</p>
            <p className="text-sm">© 2024 - Tous droits réservés. Fabriqué avec ❤️ pour le commerce Ivoirien.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
