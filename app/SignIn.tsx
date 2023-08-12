"use client";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React from "react";

const handleSignIn = () => {
  signIn("genius");
};

function SignIn() {
  return <Button onClick={handleSignIn}>login</Button>;
}

export default SignIn;
