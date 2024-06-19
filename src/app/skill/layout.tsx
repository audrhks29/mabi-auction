import SkillTab from "@/components/skill/SkillTab";
import SameTalentSkills from "@/components/skill/talent/SameTalentSkills";

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
