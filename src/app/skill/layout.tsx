import SkillTab from "@/components/skill/category/layout/SkillTab";

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
