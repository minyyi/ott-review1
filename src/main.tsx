import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MyPage from './pages/MyPage.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Detail from './pages/Detail.tsx';
import Write from './pages/Write.tsx';
import SearchPage from './pages/SearchPage.tsx';
import ReviewList from './component/ReviewList.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/write',
    element: <Write />,
  },
  {
    path: '/my',
    element: <MyPage name="유저" />,
  },

  {
    path: '/review/:id',
    element: <Detail />,
  },
  {
    path: '/list',
    element: <ReviewList />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
