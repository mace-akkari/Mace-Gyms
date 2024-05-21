import fakeData from "./fakeData.json";

export async function GET() {
  return Response.json(fakeData);
}
