'use client';
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [ "Profile", "Dashboard", "My Settings", "Help & Feedback", "Log Out" ];
    return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} className='light:bg-white'>
      <NavbarMenuToggle className="sm:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

        <NavbarBrand>
          {/** Brand logo here */}
          <p className="font-bold text-inherit">Brand</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/"> Home </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/" aria-current="page"> Choices </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/"> Support </Link>
          </NavbarItem>
        </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher/>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="/">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/" variant="flat"> Sign Up </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full" href="/" size="lg"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
