export interface Dish {
  active: boolean;
  category: string;
  description: string;
  favourite: boolean;
  id: number;
  imageId: string | null;
  likes: number;
  receipt: string;
  title: string;
};

export interface Label {
  id: number;
  title: string;
};

export interface Kitchenware {
  active: boolean;
  category: string;
  description: string;
  id: number;
  imageId: string | null;
  title: string;
};

export interface Ingredient {
  active: boolean;
  category: string;
  description: string;
  id: number;
  imageId: string | null;
  measurement: string
  title: string
};

export interface Comment {
  firstname: string;
  id: number;
  imageId: string | null;
  lastname: string;
  text: string;
  timestamp: string;
  userId: number;
}
