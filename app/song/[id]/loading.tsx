"use client";
import { Spinner } from "@nextui-org/react";
import React from "react";

function loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export default loading;
