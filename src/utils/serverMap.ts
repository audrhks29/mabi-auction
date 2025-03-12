export const serverMap: Record<string, string> = {
  lute: "류트",
  mandolin: "만돌린",
  harp: "하프",
  wolf: "울프",
};

export function encodeServer(params: { server: string }): string {
  const serverName = serverMap[params.server] || "";
  return encodeURI(serverName);
}
