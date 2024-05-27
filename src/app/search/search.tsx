import { useRef, FormEvent } from "react";
import { TransformedWorkout } from "./interfaces";

interface SearchProps {
  submitHandler: (searchValue: string) => void;
  searchResults: TransformedWorkout[];
  outputValue: string;
}

export default function SearchBar({
  submitHandler,
  searchResults,
  outputValue,
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      submitHandler(inputRef.current.value);
    }
  };

  return (
    <>
      <form className="flex items-center" onSubmit={handleSubmit}>
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
            <div
              className="flex flex-wrap gap-4"
              key={`${result.id}-${result.index}`}
            >
              <div className="border-2 border-black p-4 w-64 inline-block mb-4">
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
