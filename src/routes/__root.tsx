import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';

import { ThemeProvider } from '#/components/theme-provider';
import TanStackQueryProvider from '../integrations/tanstack-query/root-provider';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import appCss from '../styles.css?url';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'FolioByMe',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
    scripts: [
      {
        type: 'text/javascript',
        children: `(function(){var t=localStorage.getItem('ui-theme');var d=document.documentElement;d.classList.remove('light','dark');if(t==='light'||t==='dark'){d.classList.add(t);}else{d.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}})();`,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <TanStackQueryProvider>
          <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            {children}

            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
          </ThemeProvider>
        </TanStackQueryProvider>
        <Scripts />
      </body>
    </html>
  );
}
