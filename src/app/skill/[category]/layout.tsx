import SameTalentSkills from "@/components/skill/category/SameTalentSkills";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SameTalentSkills />

      {children}
    </>
  );
}
