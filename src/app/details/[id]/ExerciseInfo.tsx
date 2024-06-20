import { PageProps, Exercise, Note } from "./interfaces";
import { useFetchData } from "./fetchData";

const ExerciseInfo = ({ params }: PageProps) => {
  const details = useFetchData(params.id);

  if (!details) {
    return <h2>Loading...</h2>;
  }

  const { category, muscles, exercises, equipment, images } = details;

  const englishExercise = exercises?.find(
    (exercise: Exercise) => exercise.language === 2
  );

  return (
    <div>
      <h3>Basic Information</h3>
      <p>Category: {category?.name ?? "N/A"}</p>

      <h3>Muscles</h3>
      {muscles.map((muscle: any) => (
        <div key={muscle.id} className="mb-4">
          <p>Name: {muscle.name}</p>
          <p>Also known as: {muscle.name_en}</p>
          <img
            src={`https://wger.de${muscle.image_url_main}`}
            alt={muscle.name}
            className="w-[70px] h-[70px] border-2 border-black"
          />
        </div>
      ))}

      {englishExercise && (
        <>
          <h3>Exercises:</h3>
          <div key={englishExercise.id}>
            <p>Name: {englishExercise.name}</p>
            <p>Description:</p>
            <div
              dangerouslySetInnerHTML={{ __html: englishExercise.description }}
            />
            <h4>Comments:</h4>
            {englishExercise.notes?.length ? (
              englishExercise.notes.map((note: Note) => (
                <div key={note.id}>
                  <p>{note.comment}</p>
                </div>
              ))
            ) : (
              <p>Comments coming soon.</p>
            )}
          </div>
        </>
      )}

      <h3>Equipment:</h3>
      {equipment?.[0] ? (
        equipment.map((item: any) => (
          <div key={item.id}>
            <p>Name: {item.name}</p>
          </div>
        ))
      ) : (
        <p>Please wait for our updates coming soon.......</p>
      )}

      <h3>Images:</h3>
      {images?.[0] ? (
        images.map((image: any) => (
          <div key={image.id}>
            <img
              src={image.image}
              alt={`Image ${image.id}`}
              className="w-[300px] h-[300px] border-2 border-black"
            />
          </div>
        ))
      ) : (
        <p>No images available.</p>
      )}

      <h3>JSON Data</h3>
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </div>
  );
};

export default ExerciseInfo;
