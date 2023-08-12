"use client";
import React from "react";
import { Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
type SongCardProps = {
  id: string;
  thumbnailUrl: string;
  title: string;
};
function SongCard({ title, thumbnailUrl, id }: SongCardProps) {
  return (
    <Link href={`song/${id}`} prefetch={true}>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none flex flex-grow cursor-pointer opacity-90 hover:opacity-100"
      >
        <Image
          alt="Album art"
          className="object-cover w-full h-full"
          src={thumbnailUrl}
          width={400}
          height={400}
        />
        <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className=" text-white/80">{title}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default SongCard;
