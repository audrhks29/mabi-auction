import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mabinogi.vercel.app/sitemap.xml",
    host: "https://mabinogi.vercel.app",
  };
}
