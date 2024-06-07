type PageArgs = { params: { id: string } };

export default function Page({ params }: PageArgs) {
  return <h2>Details : {params.id}</h2>;
}
