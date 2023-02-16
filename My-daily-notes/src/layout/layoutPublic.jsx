import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/navBar';

const LayoutPublic = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default LayoutPublic;