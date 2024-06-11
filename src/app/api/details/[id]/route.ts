//here first req to get id - once it's here get muscles endpoint
// zod

type RouteArgs = { params: { id: string } };

export async function GET(request: Request, { params }: RouteArgs) {
  const id = params.id;

  try {
    const data = await exercise(id);

    return Response.json(data);
  } catch (error) {
    console.error("Error during API call:", error);
    return Response.json({ error }, { status: 500 });
  }
}

//for exercie - taking id

async function exercise(id: string) {
  const apiUrl = `https://wger.de/api/v2/exercise-base/${id}`;
  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}

async function muscles(front: boolean) {
  const apiUrl = `https://wger.de/api/v2/muscle/?is_front=${
    front ? "true" : "false"
  }`;
  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}

// map the id to the muscle
