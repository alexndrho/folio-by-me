import { createFileRoute, Outlet } from '@tanstack/react-router';
import Header from '#/components/header';

export const Route = createFileRoute('/_main')({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto p-2">
        <Outlet />
      </main>
    </div>
  ),
});
