"use client";

import { useState } from "react";
import { TransformedWorkout } from "./interfaces";
import fetchData from "./fetchData";
import SearchBar from "./search";

export default function Search() {
  const [outputValue, setOutputValue] = useState("");
  const [searchResults, setSearchResults] = useState<TransformedWorkout[]>([]);

  const submitHandler = (searchValue: string) => {
    setOutputValue(searchValue.toLowerCase());
    fetchData(searchValue.toLowerCase(), setSearchResults);
  };

  return (
    <>
      <h2>Search</h2>
      <SearchBar
        submitHandler={submitHandler}
        searchResults={searchResults}
        outputValue={outputValue}
      />
    </>
  );
}
