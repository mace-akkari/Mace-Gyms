"use client";

import ExerciseInfo from "./ExerciseInfo";
import { PageProps } from "./interfaces";

const ExerciseDetails = ({ params }: PageProps) => {
  return <ExerciseInfo params={params} />;
};

export default ExerciseDetails;

// "use client";

// import { useEffect, useState } from "react";

// type PageArgs = { params: { id: string } };

// export default function Page({ params }: PageArgs) {
//   const [details, setDetails] = useState({ license_author: null });

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(`/api/details/${params.id}`);
//       const json = await res.json();
//       setDetails(json);
//     };
//     fetchData();
//   }, []);

//   return <h2>Details : {details?.license_author ?? "Loading..."}</h2>;
// }

//extract - const res = await fetch(`/api/details/${params.id}`);
//make it into a function-  const json = await res.json();
