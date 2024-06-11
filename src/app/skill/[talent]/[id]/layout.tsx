import SameTalentSkills from "@/components/skill/talent/SameTalentSkills";

export default function TalentLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    talent: string;
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
