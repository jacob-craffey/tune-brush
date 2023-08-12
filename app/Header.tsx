"use client";
import React from "react";
import SignIn from "./SignIn";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";

function Header() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link className="font-bold text-inherit" href={"/"}>
          tune-brush
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <SignIn />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
