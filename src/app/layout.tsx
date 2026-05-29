import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { StickyCTA } from "@/components/StickyCTA";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { Splash } from "@/components/Splash";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.contact.siteUrl),
  title: {
    default: `${site.brand.name} · Distribuidora atacadista B2B em SP e SC`,
    template: `%s · ${site.brand.name}`,
  },
  description:
    "Distribuidora atacadista B2B para revendedores no Sudeste e Sul. Centros logísticos em Santa Catarina e São Paulo. Pedido mínimo R$ 800. Despacho em 48h. Loja física ou marketplace.",
  keywords: [
    "Repon",
    "distribuidora atacadista",
    "distribuidora atacadista B2B",
    "atacado papelaria",
    "atacado higiene pessoal",
    "atacado informática",
    "atacado eletro",
    "distribuidora SP",
    "distribuidora SC",
    "atacadista Sudeste",
    "atacadista Sul",
    "revenda papelaria",
    "atacado para marketplace",
    "fornecedor papelaria",
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
    title: `${site.brand.name} · Distribuidora atacadista B2B`,
    description:
      "Atacado direto para revendedores no Sudeste e Sul. Centros logísticos em SC e SP. Pedido mínimo R$ 800. Despacho em 48h.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} · Distribuidora atacadista B2B`,
    description:
      "Atacado direto para revendedores no Sudeste e Sul. Centros em SC e SP.",
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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Repon",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
    date: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#01092D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ─────────── Organization ───────────
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

  // ─────────── LocalBusiness × N ───────────
  const localBusinessesJsonLd = site.locations.map((l) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.contact.siteUrl}#${l.slug}`,
    name: `${site.brand.name} · ${l.label}`,
    image: `${site.contact.siteUrl}/repon-mark-blue.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: l.city,
      addressRegion: l.state,
      postalCode: l.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: l.coords.lat,
      longitude: l.coords.lng,
    },
    telephone: `+55${site.contact.phoneRaw.slice(2)}`,
    email: site.contact.emails.comercial,
    url: site.contact.siteUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: site.coverage.states.map((s) => ({ "@type": "State", name: s })),
    priceRange: "$$",
  }));

  // ─────────── FAQPage ───────────
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (site.faqCategories.flatMap((c) => c.items as readonly { q: string; a: string }[])).map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.a,
      },
    })),
  };


  // ─────────── Service ───────────
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Distribuição atacadista B2B",
    provider: { "@type": "Organization", name: site.brand.legalName, url: site.contact.siteUrl },
    areaServed: site.coverage.states.map((s) => ({ "@type": "State", name: s })),
    serviceType: "Wholesale distribution",
    description: "Distribuição atacadista B2B para revendedores no Sudeste e Sul. Papelaria, higiene, informática e eletro. Despacho em 48h.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Verticais ativas",
      itemListElement: site.verticals.map((v) => ({
        "@type": "OfferCatalog",
        name: v.title,
        description: v.summary,
      })),
    },
  };

  // ─────────── WebSite (SearchAction opcional) ───────────
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brand.name,
    url: site.contact.siteUrl,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: site.brand.legalName },
  };

  return (
    <html lang="pt-BR">
      <head>
        {/* fontPreload — fontes críticas Funnel Display/Sans */}
        <link rel="preload" href="/fonts/FunnelDisplay-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/FunnelDisplay-Light.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/FunnelSans-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Splash />
        <CustomCursor />
        <a href="#main" className="skip-link">Pular para o conteúdo principal</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {localBusinessesJsonLd.map((lb, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }}
          />
        ))}
        <ScrollProgress />
        <Header />
        <main id="main" className="flex-1" tabIndex={-1}>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <StickyCTA />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
