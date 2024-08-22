import SkillTab from "@/components/skill/detail/layout/SkillTab";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="inner">
      <SkillTab />

      {children}
    </main>
  );
}
