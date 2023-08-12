"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

function SignIn() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Image
            width={40}
            height={40}
            src={session.user?.image ?? ""}
            alt={"Profile Picture"}
            className="rounded-full cursor-pointer"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Button
      onClick={() => {
        signIn("genius");
      }}
    >
      login
    </Button>
  );
}

export default SignIn;
