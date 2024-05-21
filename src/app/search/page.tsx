"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

interface Workout {
  id: number;
  bodyPart: string;
  workout: string;
}

export default function Search() {
  const [outputValue, setOutputValue] = useState("");
  const [data, setData] = useState<Workout[]>([]);
  const [searchResults, setSearchResults] = useState<Workout[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/fakedata")
      .then((response) => response.json())
      .then((data: Workout[]) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const searchValue = inputRef.current.value.toLowerCase();
      setOutputValue(searchValue);
      const results = data.filter(
        (workout) =>
          workout.workout.toLowerCase().includes(searchValue) ||
          workout.bodyPart.toLowerCase().includes(searchValue)
      );
      setSearchResults(results);
    }
  };

  return (
    <>
      <h2>Search</h2>
      <form className="flex items-center" onSubmit={submitHandler}>
        <input
          type="search"
          placeholder="Search Exercise"
          className="border border-sky-500 py-1 px-2 h-8 rounded focus:outline-none"
          ref={inputRef}
        />
        <button className="bg-sky-500 hover:bg-sky-700 text-white py-1 px-2 h-8 rounded">
          Search
        </button>
      </form>
      <output>{outputValue}</output>
      {searchResults.length > 0 ? (
        <div>
          <h3>Search Results</h3>
          {searchResults.map((result) => (
            <div key={result.id}>
              <p>Body Part: {result.bodyPart}</p>
              <p>Workout: {result.workout}</p>
            </div>
          ))}
        </div>
      ) : (
        outputValue && <p>No results found this time</p>
      )}
    </>
  );
}

//  colour scheme
// create an api endpoint for the search. use wagr: https://wger.de/api/v2/schema/ui#/language/language_list
//fetch data from api -> map over result,
