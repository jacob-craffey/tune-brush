"use client";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    if (!searchTerm) return;
    e.preventDefault();
    router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        size="md"
        type="text"
        label="Song"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}

export default Search;
