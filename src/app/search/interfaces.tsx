interface WorkoutData {
  id: number;
  base_id: number;
  name: string;
  category: string;
  image: string;
  image_thumbnail: string;
}
export interface TransformedWorkout
  extends Omit<WorkoutData, "base_id" | "category"> {
  bodyPart: string;
  workout: string;
  imageUrl: string;
  index: number;
  name: string;
}

export interface Workout {
  data: WorkoutData;
  value: string;
}
