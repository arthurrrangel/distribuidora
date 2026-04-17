import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Repon | Papelaria e escritório no atacado",
  description:
    "Plataforma B2B de papelaria e material de escritório com CNPJ. Preço de atacado, frete grátis e entrega em 24h no Rio de Janeiro.",
  keywords: [
    "papelaria atacado",
    "material escritório CNPJ",
    "distribuidora papelaria RJ",
    "Repon distribuidora",
    "papelaria B2B",
    "material escritório atacado",
  ],
  authors: [{ name: "Repon Plataforma de Comércio Ltda" }],
  creator: "Repon",
  metadataBase: new URL("https://repon.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://repon.com.br",
    siteName: "Repon",
    title: "Repon | Papelaria e escritório no atacado",
    description:
      "Compre papelaria e material de escritório no atacado com CNPJ. Frete grátis, entrega em 24h, nota fiscal em todo pedido.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Repon — Papelaria e escritório no atacado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Repon | Papelaria e escritório no atacado",
    description:
      "Compre papelaria e material de escritório no atacado com CNPJ. Frete grátis, entrega em 24h.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-white antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <WhatsAppButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
