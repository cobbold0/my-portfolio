type StudioLayoutProps = {
  children: React.ReactNode;
};

export default function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-background">
      {children}
    </div>
  );
}
