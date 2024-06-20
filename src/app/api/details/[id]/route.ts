type RouteArgs = { params: { id: string } };

export async function GET(request: Request, { params }: RouteArgs) {
  const id = params.id;

  try {
    const exerciseData = await exercise(id);

    // extract muscle IDs from the exercise data
    const muscleIds = exerciseData.muscles.map((muscle: any) => muscle.id);

    // fetch muscle details for each muscle ID concurrently
    const muscleData = await Promise.all(
      muscleIds.map((muscleId: string) => fetchMuscleById(muscleId))
    );

    // add muscle data to the exercise data
    exerciseData.muscleDetails = muscleData;

    return Response.json(exerciseData);
  } catch (error) {
    console.error("Error during API call:", error);
    return Response.json({ error }, { status: 500 });
  }
}

// fetch exercise data by ID
async function exercise(id: string) {
  const apiUrl = `https://wger.de/api/v2/exercisebaseinfo/${id}`;
  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}

// fetch muscle data by ID
async function fetchMuscleById(id: string) {
  const apiUrl = `https://wger.de/api/v2/muscle/${id}`;
  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}

// //here first req to get id - once it's here get muscles endpoint
// // zod

// type RouteArgs = { params: { id: string } };

// export async function GET(request: Request, { params }: RouteArgs) {
//   const id = params.id;

//   try {
//     const data = await exercise(id);
//     console.log("new here", data);

//     return Response.json(data);
//   } catch (error) {
//     console.error("Error during API call:", error);
//     return Response.json({ error }, { status: 500 });
//   }
// }

// //for exercie - taking id

// async function exercise(id: string) {
//   const apiUrl = `https://wger.de/api/v2/exercisebaseinfo/${id}`;
//   const res = await fetch(apiUrl, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return await res.json();
// }

// async function muscles(front: boolean) {
//   const apiUrl = `https://wger.de/api/v2/muscle/?is_front=${
//     front ? "true" : "false"
//   }`;
//   const res = await fetch(apiUrl, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return await res.json();
// }

// // map the id to the muscle
