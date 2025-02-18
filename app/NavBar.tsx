"use client";

import { Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classnames from "classnames";
import Logo from "./Images/Aura Logo-01.png";
import Image from 'next/image';

const NavBar = () => {
    return (
      <nav className="border-b mb-5 px-5 py-3">
        <Container>
          <Flex justify="between">
            <Flex align="center" gap="3">
              <Link href="/">
                <Image src={Logo} alt="aura logo" width={180} height={200} />
              </Link>
              <NavLinks />
            </Flex>
          </Flex>
        </Container>
      </nav>
    );
  };

  const NavLinks = () => {
    const currentPath = usePathname();
  
    const links = [
      { label: "Projects", href: "/" },
    ];
  
    return (
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "nav-link": true,
                "!text-zinc-900": link.href === currentPath,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  

export default NavBar;