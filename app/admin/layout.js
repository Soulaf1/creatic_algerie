export const metadata = {
  title: 'Admin - CREATIC-ALGERIE',
};

export default function AdminLayout({ children }) {
  return (
    <>
      <style>{`
        nav, footer { display: none !important; }
        main { padding: 0 !important; margin: 0 !important; }
      `}</style>
      {children}
    </>
  );
}