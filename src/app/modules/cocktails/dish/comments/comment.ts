export interface Comment {
  id: number;
  userId: number;
  timestamp: string;
  firstname: string;
  lastname: string;
  imageId: string | null;
  text: string;
}
