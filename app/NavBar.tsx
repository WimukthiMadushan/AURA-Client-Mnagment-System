"use client";

import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import Image from "next/image";
import Logo from "./Images/Aura Logo-01.png";
import Login from "@/components/Login";
import RegisterMembers from "@/components/RegisterMembers";
import Logout from "@/components/Logout";
import { useAuth } from "./Hooks/AuthContextHook";

const NavBar = () => {
  const { role } = useAuth();
  console.log("inside navbar", role);
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="5">
            <Link href="/">
              <Image src={Logo} alt="Aura Logo" width={180} height={200} />
            </Link>
            <NavLinks />
          </Flex>
          <Flex align="center" gap="3">
            { !role && <Login />}
            { role == "admin" && <RegisterMembers />}
            { role && <Logout/>}
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [{ label: "Projects", href: "/" }];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900 font-medium": link.href === currentPath,
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


