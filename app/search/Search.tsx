"use client";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

type Params = {
  term: string;
};

function Search({ term }: Params) {
  const [searchTerm, setSearchTerm] = useState(term);
  const router = useRouter();
  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    if (!searchTerm) return;
    e.preventDefault();
    router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        size="md"
        type="text"
        label="Song"
        className="max-w-md m-auto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={inputRef}
      />
    </form>
  );
}

export default Search;
