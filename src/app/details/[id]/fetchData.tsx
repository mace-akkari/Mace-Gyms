import { useEffect, useState } from "react";

export const useFetchData = (id: string) => {
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/details/${id}`);
        if (!res.ok) {
          console.error("Fetch error:", res.statusText);
          return;
        }
        const json = await res.json();
        setDetails(json);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchData();
  }, [id]);

  return details;
};
