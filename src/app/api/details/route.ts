//here first req to get id - once it's here get muscles endpoint

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  const apiUrl = `https://wger.de/api/v2/exercise/search/?language=english&term=${encodeURIComponent(
    term ?? "Back"
  )}`;
  try {
    const res = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error during API call:", error);
    return Response.json({ error }, { status: 500 });
  }
}

//for exercie - taking id

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
