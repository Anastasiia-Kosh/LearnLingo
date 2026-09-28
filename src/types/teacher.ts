export interface Review {
  reviewer_name: string;
  reviewer_rating: string;
  comment: string;
}

export interface Teacher {
    id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: string;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

