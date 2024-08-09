import SameTalentSkills from "@/components/shared/layout/SameTypeSkills";

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
