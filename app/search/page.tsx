import React from "react";
import Search from "./Search";
import Results from "./Results";

type PageProps = {
  searchParams: {
    term: string;
  };
};

function SearchResults({ searchParams: { term } }: PageProps) {
  return (
    <div className="flex flex-col gap-12">
      <Search term={term} />
      <Results term={term} />
    </div>
  );
}

export default SearchResults;
