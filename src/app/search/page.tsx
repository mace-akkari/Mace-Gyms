"use client";

import { useState, useEffect, FormEvent } from "react";
import { TransformedWorkout, Workout } from "./interfaces";
import fetchData from "./fetchData";
import SearchBar from "./search";

export default function Search() {
  const [outputValue, setOutputValue] = useState("");
  const [data, setData] = useState<Workout[]>([]);
  const [searchResults, setSearchResults] = useState<TransformedWorkout[]>([]);

  useEffect(() => {
    fetch("/api/fakedata")
      .then((response) => response.json())
      .then((data: Workout[]) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
