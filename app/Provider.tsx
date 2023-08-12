"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}

export default Provider;
