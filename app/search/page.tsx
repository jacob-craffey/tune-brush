import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import SongCard from "./SongCard";
import Search from "./Search";
import { Hits, Response } from "../../typings";

type PageProps = {
  searchParams: {
    term: string;
  };
};

const search = async (searchTerm: string) => {
  if (!searchTerm) return;
  const session = await getServerSession(authOptions);

  const res = await fetch(`https://api.genius.com/search?q=${searchTerm}`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  const data: Response<Hits> = await res.json();
  return data.response.hits;
};

async function SearchResults({ searchParams: { term } }: PageProps) {
  const searchResults = await search(term);
  return (
    <div className="flex flex-col gap-12">
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {searchResults?.map((row, i) => (
          <SongCard
            key={i}
            id={row.result.id.toString()}
            thumbnailUrl={row.result.song_art_image_thumbnail_url}
            title={row.result.title_with_featured}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
