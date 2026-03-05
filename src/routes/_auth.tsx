import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getSession } from '#/lib/session';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (session) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      });
    }
  },
  component: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Outlet />
    </div>
  ),
});
