import { createFileRoute, Outlet } from '@tanstack/react-router';
import Header from '#/components/header';

export const Route = createFileRoute('/_main')({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  ),
});
