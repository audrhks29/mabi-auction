import { MetadataRoute } from "next";
import noticeLists from "@/assets/notice.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls = [
    {
      url: "https://mabiauction.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: "https://mabiauction.vercel.app/open-quest",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const dynamicAuctionName = ["auction", "history", "my-auction"];

  const dynamicAuctionUrls = dynamicAuctionName.map(url => ({
    url: `https://mabiauction.vercel.app/auction/${url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const dynamicUrlsName = ["bighornofshout", "npc-shop"];
  const serverName = ["lute", "harp", "mandolin", "wolf"];

  const dynamicUrls = dynamicUrlsName.flatMap(url =>
    serverName.map(server => ({
      url: `https://mabiauction.vercel.app/${url}/${server}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const dynamicNoticeUrls = noticeLists.map(list => ({
    url: `https://mabiauction.vercel.app/notice/${list.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...dynamicAuctionUrls, ...dynamicUrls, ...dynamicNoticeUrls];
}
