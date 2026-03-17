import { Link } from '@tanstack/react-router';

import { authClient } from '#/lib/auth-client';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOutIcon } from 'lucide-react';

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="shadow-sm">
      <div className="container mx-auto p-2 flex items-center">
        <div className="flex-1">
          <Button variant="ghost" size="lg" asChild>
            <Link to="/">BuildByMe</Link>
          </Button>
        </div>

        <div className="flex-none">
          {!session && (
            <Button asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
          )}

          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar size="lg">
                  <AvatarImage
                    src={session.user.image || undefined}
                    alt={session.user.name || undefined}
                  />
                  <AvatarFallback>
                    {session.user.name ? session.user.name[0] : session.user.email[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem variant="destructive" onSelect={() => authClient.signOut()}>
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
