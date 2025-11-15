import AuthLayout from '@/components/layouts/AuthLayout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
import Login from '@/pages/auth';
import Dashboard from '@/pages/authenticated/dashboard';
import Unauthorized from '@/pages/error/401';
import Forbidden from '@/pages/error/403';
import NotFound from '@/pages/error/404';
import { useRoutes } from 'react-router';

export function Routes() {
  return useRoutes([
    {
      path: 'login',
      element: <AuthLayout />,
      children: [{ index: true, element: <Login /> }],
    },
    {
      element: <ProtectedRoute />,
      children: [{ path: 'dashboard', element: <Dashboard /> }],
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: 'error',
      children: [
        { path: '401', element: <Unauthorized /> },
        { path: '403', element: <Forbidden /> },
        { path: '404', element: <NotFound /> },
      ],
    },
  ]);
}
