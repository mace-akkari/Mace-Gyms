import { TransformedWorkout, Workout } from "./interfaces";

export default function fetchData(
  searchValue: string,
  setSearchResults: (searchReslt: TransformedWorkout[]) => void
) {
  fetch(`/api/search/?language=english&term=${encodeURIComponent(searchValue)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.suggestions) {
        setSearchResults(
          data.suggestions.map((item: Workout) => ({
            id: item.data.base_id,
            name: item.data.name,
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
