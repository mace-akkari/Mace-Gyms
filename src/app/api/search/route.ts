// proxy endpoint to Wger API for exercise searches in English.
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
