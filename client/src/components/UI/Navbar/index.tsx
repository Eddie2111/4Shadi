'use client';
import axios from "axios";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link} from "@nextui-org/react";
import Image from 'next/image';
import ProfileControlSection from "./ProfileControlSection";
import {usePathname} from "next/navigation";
import { useAuth,
        UserButton
        } from "@clerk/nextjs";
export default function NavigationBar():JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [profileData, setProfileData] = React.useState<IUserProps>({});
    const menuItems = [ "Profile", "Dashboard", "My Settings", "Help & Feedback", "Log Out" ];
    const pathname = usePathname();
    React.useEffect(()=>{
      axios.get<IUserProps>('http://localhost:3500/profile/getone', {withCredentials: true})
      .then((res)=>{
        setProfileData(res);
      })
      .then(()=>{
        setTokening(profileData?.data?.user?.serial || 'null')
      })
      .catch((err)=>{console.log(err)})
    },[profileData?.data?.user?.serial])
    // const { isLoaded, userId, sessionId, getToken } = useAuth();
    return (

    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} className='light:bg-white'>
      <NavbarMenuToggle className="sm:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

        <NavbarBrand>
          <Link href={ profileData?.data?.user?.serial ? `/choices` : "/"} >
          <Image src='/brand-logo-clean.svg' width={100} height={50} alt='logo'  />
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href={ profileData?.data?.user?.serial ? `/feed` : "/"}
                  className={pathname === "/" ? "underline" : ""}
               >Home </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/choices"
                  aria-current="page"
                  className={pathname === "/choices" ? "underline" : ""}
                > Choices </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/blogs"
                  aria-current="page"
                  className={pathname === "/blogs" ? "underline" : ""}
                > Blogs </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/support"
                  aria-current="page"
                  className={pathname === "/support" ? "underline" : ""}
                  > Support </Link>
          </NavbarItem>
        </NavbarContent>

      <ProfileControlSection token={profileData?.data?.user?.serial || 'null'}/>
      <UserButton/>

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


interface IUserProps{
  data?: {
      user?: {
          _id: string;
          age: string
          birth_cert: string
          email: string;
          height: string;
          location: string;
          marriage_cert: string;
          name: string;
          nid_number: string;
          phone_number: string
          preferences: string;
          serial: string;
      }
  },
  user?: {
      _id: string;
      age: string
      birth_cert: string
      email: string;
      height: string;
      location: string;
      marriage_cert: string;
      name: string;
      nid_number: string;
      phone_number: string
      preferences: string;
      serial: string;
  }
}