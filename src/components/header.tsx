import { Link } from '@tanstack/react-router';
import { LogOutIcon, UserIcon } from 'lucide-react';

import { authClient } from '#/lib/auth-client';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="w-full border-b border-border">
      <div className="container mx-auto p-4 flex justify-between items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/">DevFolio</Link>
        </Button>

        <div className="flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={session.user.image || undefined}
                    alt={session.user.name || 'User avatar'}
                  />

                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-32">
                <DropdownMenuItem variant="destructive" onClick={() => authClient.signOut()}>
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
