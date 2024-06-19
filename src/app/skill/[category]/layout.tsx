import SameTalentSkills from "@/components/skill/talent/SameTalentSkills";

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
