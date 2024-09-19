import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react';
import Link from 'next/link';

export default function NavbarComponent() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href='/tasks'>
          <p className='font-bold text-foreground'>Task Manager</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className='sm:flex gap-3' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/tasks'>
            All
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color='foreground' href='/tasks/archived'>
            Archived
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button as={Link} color='primary' href='/tasks/create' variant='flat'>
            New Task
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
