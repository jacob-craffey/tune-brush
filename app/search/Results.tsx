import { Hits } from "@/typings";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SongCard from "./SongCard";
import { Response } from "@/typings";
type ResultsProps = {
  term: string;
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

async function Results({ term }: ResultsProps) {
  const searchResults = await search(term);

  return (
    <Suspense fallback={<p>Loading results</p>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchResults?.map((row, i) => (
          <SongCard
            key={i}
            id={row.result.id.toString()}
            thumbnailUrl={row.result.song_art_image_thumbnail_url}
            title={row.result.title_with_featured}
          />
        ))}
      </div>
    </Suspense>
  );
}

export default Results;
