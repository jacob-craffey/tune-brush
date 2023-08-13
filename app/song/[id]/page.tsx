import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { load } from "cheerio";
import React from "react";
import Image from "next/image";
import { Response, Song } from "@/typings";
import MagicButton from "./MagicButton";

type PageProps = {
  params: {
    id: string;
  };
};

type SongData = {
  lyrics: string;
  header_image_url: string;
  artist_names: string;
  title: string;
};

const fetchSongData = async (id: string) => {
  const session = await getServerSession(authOptions);
  const res = await fetch(`https://api.genius.com/songs/${id}`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });
  const data: Response<Song> = await res.json();
  return data.response.song;
};

const fetchLyrics = async (path: string) => {
  return await fetch(`https://genius.com${path}`)
    .then((response) => response.text())
    .then((html) => {
      const $ = load(html);
      const container = $('[class^="Lyrics__Container"]');
      const allText = container
        .contents()
        .map((index, element) => $(element).text().trim())
        .get()
        .filter((n) => n)
        .map((text) => (text.startsWith("[") ? `\n${text}` : text));
      return allText.join("\n");
    })
    .catch((error) => {
      console.error("Error:", error);
      return "";
    });
};

const search = async (id: string): Promise<SongData> => {
  const { header_image_url, artist_names, title, path } = await fetchSongData(
    id
  );
  const lyrics = await fetchLyrics(path);

  return {
    lyrics,
    header_image_url,
    artist_names,
    title,
  };
};

const formatLyrics = (lyrics: string) => {
  return lyrics
    .split("\n")
    .map((line, index) =>
      line.trim() === "" ? <br key={index} /> : <p key={index}>{line}</p>
    );
};

async function Page({ params }: PageProps) {
  const res = await search(params.id);
  const formattedLyrics = formatLyrics(res.lyrics);
  return (
    <div className="max-w-screen-lg m-auto">
      <div className="flex flex-col gap-10">
        <div className="flex gap-10">
          <div className="flex flex-col flex-grow m-auto gap-3">
            <h1 className="text-xl sm:text-5xl">{res.title}</h1>
            <h2 className="text-l sm:text-xl">{res.artist_names}</h2>
            <MagicButton lyrics={res.lyrics} />
          </div>

          <div className="max-w-[50%]">
            <Image
              className="rounded-lg"
              src={res?.header_image_url}
              width={300}
              height={300}
              alt="test"
              priority
              quality={100}
            />
          </div>
        </div>

        <div className="text-sm md:text-base">{formattedLyrics}</div>
      </div>
    </div>
  );
}

export default Page;
