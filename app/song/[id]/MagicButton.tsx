"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import ImageModal from "./ImageModal";

type MagicButtonProps = {
  lyrics: string;
};

async function serverSideCall(
  lyrics: string,
  onOpen: () => void,
  setUrl: React.Dispatch<React.SetStateAction<string>>
) {
  const params = {
    lyrics,
  };

  const response = await fetch("/api/magic-button", {
    method: "POST",
    body: JSON.stringify(params),
  });
  const data = await response.json();
  setUrl(data.url);
  onOpen();
}

function MagicButton({ lyrics }: MagicButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [url, setUrl] = useState("");

  return (
    <>
      <ImageModal isOpen={isOpen} onOpenChange={onOpenChange} imageUrl={url} />
      <Button
        className="w-fit"
        type="submit"
        onClick={() => serverSideCall(lyrics, onOpen, setUrl)}
      >
        Generate Art
      </Button>
    </>
  );
}

export default MagicButton;