import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.contact.siteUrl.replace(/\/$/, "");
  const now = new Date();

  return [
    { url: `${base}/`,             lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/sobre`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/verticais`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/fornecedores`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/contato`,      lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
  ];
}
