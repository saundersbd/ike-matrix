type RootLayoutProps = {
  children: React.ReactNode;
  main: React.ReactNode;
};

export default function HomeLayout({ children, main }: RootLayoutProps) {
  return (
    <>
      {children}
      {main}
    </>
  );
}
