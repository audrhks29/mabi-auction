import SameTalentSkills from "@/components/skill/talent/SameTalentSkills";

export default function CategoryLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    category: string;
    id: number;
  };
}>) {
  return (
    <main className="inner">
      <SameTalentSkills params={params} />

      {children}
    </main>
  );
}
