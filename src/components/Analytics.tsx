// src/components/Analytics.tsx
// GA4 + GTM-ready. Lê IDs do env. Se não houver env, não renderiza nada
// (build não quebra em dev). Eventos de e-commerce expostos em window.gtagEvent.
//
// Para ativar, defina no .env (ou no painel Vercel → Environment Variables):
//   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
//   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX        (opcional, alternativa ao GA puro)
//   NEXT_PUBLIC_META_PIXEL_ID=000000000   (opcional)

"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const FB_PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Em dev, é comum não ter os IDs — não logamos warning para não poluir.
  useEffect(() => {
    if (typeof window !== "undefined" && !window.dataLayer) {
      window.dataLayer = [];
    }
  }, []);

  return (
    <>
      {GTM_ID && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {GA_ID && (
        <>
          <Script
            id="ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: true, anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {FB_PIXEL && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Eventos de e-commerce — chame esses helpers de qualquer Client Component.
// Exemplo: import { trackAddToCart } from "@/components/Analytics";
// ───────────────────────────────────────────────────────────────────────────

interface TrackedProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  brand?: string;
}

function push(event: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  if (window.gtag) window.gtag("event", event, payload);
  if (window.fbq) {
    const map: Record<string, string> = {
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      purchase: "Purchase",
    };
    const fbEvent = map[event];
     if (fbEvent) window.fbq("track", fbEvent, payload);
  }
}

export function trackViewItem(p: TrackedProduct) {
  push("view_item", {
    currency: "BRL",
    value: p.price,
    items: [
      {
        item_id: p.id,
        item_name: p.name,
        item_brand: p.brand,
        item_category: p.category,
        price: p.price,
        quantity: 1,
      },
    ],
  });
}

export function trackAddToCart(p: TrackedProduct) {
  push("add_to_cart", {
    currency: "BRL",
    value: p.price * (p.quantity ?? 1),
    items: [
      {
        item_id: p.id,
        item_name: p.name,
        item_brand: p.brand,
        item_category: p.category,
        price: p.price,
        quantity: p.quantity ?? 1,
      },
    ],
  });
}

export function trackBeginCheckout(items: TrackedProduct[], total: number) {
  push("begin_checkout", {
    currency: "BRL",
    value: total,
    items: items.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      item_brand: p.brand,
      item_category: p.category,
      price: p.price,
      quantity: p.quantity ?? 1,
    })),
  });
}

export function trackWhatsAppClick(context: string) {
  push("whatsapp_click", { context });
}

export function trackSearch(term: string) {
  push("search", { search_term: term });
}
