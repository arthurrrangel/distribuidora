import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.contact.siteUrl.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`,                     lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/a-repon`,              lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/verticais`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/operacao`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/como-comprar`,         lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/fornecedores`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contato`,              lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${base}/faq`,                  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/transparencia`,        lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/politica-privacidade`, lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/termos`,               lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/politica-cookies`,     lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
