import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { StickyCTA } from "@/components/StickyCTA";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.contact.siteUrl),
  title: {
    default: `${site.brand.name} — ${site.brand.slogan}`,
    template: `%s — ${site.brand.name}`,
  },
  description:
    "Distribuidora atacadista B2B com operação logística em Santa Catarina e São Paulo. Papelaria, higiene, informática e eletroeletrônicos para revendedores no Sudeste e Sul. O fluxo que mantém seu negócio ativo.",
  keywords: [
    "Repon",
    "distribuidora atacadista",
    "atacado B2B",
    "papelaria atacado",
    "higiene pessoal atacado",
    "informática atacado",
    "eletroeletrônicos atacado",
    "Sudeste",
    "Sul",
    "Santa Catarina",
    "São Paulo",
  ],
  authors: [{ name: site.brand.legalName }],
  creator: site.brand.legalName,
  publisher: site.brand.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.contact.siteUrl,
    siteName: site.brand.name,
    title: `${site.brand.name} — ${site.brand.slogan}`,
    description: site.brand.descriptor,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — ${site.brand.slogan}`,
    description: site.brand.descriptor,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/repon-mark-blue.svg", type: "image/svg+xml" },
      { url: "/favicon.svg",         type: "image/svg+xml" },
    ],
    shortcut: "/repon-mark-blue.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#01092D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand.legalName,
    alternateName: site.brand.name,
    slogan: site.brand.slogan,
    url: site.contact.siteUrl,
    legalName: site.brand.legalName,
    foundingDate: "2024-04-02",
    taxID: site.fiscal.matriz.cnpj,
    email: site.contact.emails.comercial,
    telephone: `+55${site.contact.phoneRaw.slice(2)}`,
    address: site.locations.map((l) => ({
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: l.city,
      addressRegion: l.state,
      postalCode: l.zip,
      addressCountry: "BR",
    })),
    areaServed: site.coverage.states.map((s) => ({ "@type": "State", name: s })),
    sameAs: [site.contact.social.instagramUrl],
  };

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <StickyCTA />
      </body>
    </html>
  );
}
