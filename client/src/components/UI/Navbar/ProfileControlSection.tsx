'use client';
import ThemeSwitcher from "./ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import { NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
export default function index({token}:string): JSX.Element {
    console.log(token || " ")
    if (token.length > 5) return (
        <NavbarContent justify="end">
            <NavbarItem>
            <ThemeSwitcher/>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
            <Link href="/profile">Profile</Link>
            </NavbarItem>
            <NavbarItem>
            <Button as={Link} color="danger" href="/logout" variant="flat"> Logout </Button>
            </NavbarItem>
            <UserButton />
        </NavbarContent>
    )
    else
    return(
        <NavbarContent justify="end">
            <NavbarItem>
            <ThemeSwitcher/>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
            <Link href="/signin">Login</Link>
            </NavbarItem>
            <NavbarItem>
            <Button as={Link} color="primary" href="/signup" variant="flat"> Sign Up </Button>
            </NavbarItem>
            <UserButton />
        </NavbarContent>
    )
    }