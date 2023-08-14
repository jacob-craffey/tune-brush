"use client";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import ImageModal from "./ImageModal";

type MagicButtonProps = {
  lyrics: string;
};

async function serverSideCall(
  lyrics: string,
  onOpen: () => void,
  setUrl: React.Dispatch<React.SetStateAction<string>>,
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsGenerating(true);
  const params = {
    lyrics,
  };

  const response = await fetch("/api/lyrics", {
    method: "POST",
    body: JSON.stringify(params),
  });

  const data = await response.json();
  const prompt = data.lyrics;

  const imageParams = {
    prompt,
  };
  const image = await fetch("/api/image", {
    method: "POST",
    body: JSON.stringify(imageParams),
  });

  const url = await image.json();
  setUrl(url.url);
  setIsGenerating(false);
  onOpen();
}

function MagicButton({ lyrics }: MagicButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <>
      <ImageModal isOpen={isOpen} onOpenChange={onOpenChange} imageUrl={url} />
      <Button
        className="w-fit"
        type="submit"
        onClick={() => serverSideCall(lyrics, onOpen, setUrl, setIsGenerating)}
      >
        {isGenerating ? <Spinner /> : "Generate Image"}
      </Button>
    </>
  );
}

export default MagicButton;
