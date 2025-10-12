import Header from '@/app/_components/header';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="The Forge" showAccount={true} />
      <main className="min-h-0 flex-1 overflow-hidden pt-16">{children}</main>
    </>
  );
}
