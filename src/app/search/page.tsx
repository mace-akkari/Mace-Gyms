"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
interface WorkoutData {
  id: number;
  base_id: number;
  name: string;
  category: string;
  image: string;
  image_thumbnail: string;
}
interface TransformedWorkout extends Omit<WorkoutData, "base_id" | "category"> {
  bodyPart: string;
  workout: string;
  imageUrl: string;
  index: number;
}

interface Workout {
  data: WorkoutData;
  value: string;
}

export default function Search() {
  const [outputValue, setOutputValue] = useState("");
  const [data, setData] = useState<Workout[]>([]);
  const [searchResults, setSearchResults] = useState<TransformedWorkout[]>([]);
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

      fetch(
        `/api/fakedata/exercise/search?language=english&term=${encodeURIComponent(
          searchValue
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.suggestions) {
            setSearchResults(
              data.suggestions.map((item: Workout) => ({
                id: item.data.id,
                bodyPart: item.data.category,
                workout: item.value,
                imageUrl: item.data.image
                  ? `https://wger.de${item.data.image}`
                  : "/images/placeholder.png",
              }))
            );
          } else {
            setSearchResults([]);
            console.log("No results found", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setSearchResults([]);
        });
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
      {searchResults.length > 0 ? (
        <div>
          <p className="text-2xl font-bold">Search Results</p>
          {searchResults.map((result) => (
            <div className="flex flex-wrap gap-4">
              <div
                className="border-2 border-black p-4 w-64 inline-block mb-4"
                key={`${result.id}-${result.index}`}
              >
                <img
                  src={result.imageUrl}
                  alt={`Image of ${result.workout}`}
                  className="w-20 h-20 mb-4"
                />
                <div>
                  <p>Body Part: {result.bodyPart}</p>
                  <p>Workout: {result.workout}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        outputValue && <p>No results found this time</p>
      )}
    </>
  );
}
