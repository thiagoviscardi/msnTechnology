import Header from 'shared/component/header';
import Sidebar from 'shared/component/sidebar';

export function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <Header />
      <main>{children}</main>
    </>
  );
}
