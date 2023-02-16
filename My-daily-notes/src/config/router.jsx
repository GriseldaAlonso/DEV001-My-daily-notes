import { createBrowserRouter } from 'react-router-dom';
import LayoutPublic from '../layout/layoutPublic';
import LayoutPrivate from '../layout/layoutPrivate';
import Login from '../pages/logIn';
import Home from '../pages/Home';
import NotFound from '../pages/notFound';
import Dashboard from '../pages/dashboard';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/home',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: '/home/dashboard',
            element: <Dashboard />,
          },
        ],
      }
    ],
  },
]);
