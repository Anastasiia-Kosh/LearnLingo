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

//   {
//     name: Jane,
//     surname: Smith,
//     languages: [French, German],
//     levels: [A1 Beginner, A2 Elementary, B1 Intermediate, B2 Upper-Intermediate],
//     rating: 4.8,
//     reviews: [
//       {
//         reviewer_name: Eve,
//         reviewer_rating: 5,
//         comment: Jane is an amazing teacher! She is patient and supportive.
//       },
//       {
//         reviewer_name: Frank,
//         reviewer_rating: 4,
//         comment: Jane's lessons were very helpful. I made good progress.
//       }
//     ],
//     price_per_hour: 30,
//     lessons_done: 1098,
//     avatar_url: https://ftp.goit.study/img/avatars/2.jpg,
//     lesson_info: Lessons are structured to cover grammar, vocabulary, and practical usage of the language.,
//     conditions: [
//       Welcomes both adult learners and teenagers (13 years and above).,
//       Provides personalized study plans.
//     ],
//     experience: Jane is an experienced and dedicated language teacher specializing in German and French. She holds a Bachelor's degree in German Studies and a Master's degree in French Literature. Her passion for languages and teaching has driven her to become a highly proficient and knowledgeable instructor. With over 10 years of teaching experience, Jane has helped numerous students of various backgrounds and proficiency levels achieve their language learning goals. She is skilled at adapting her teaching methods to suit the needs and learning styles of her students, ensuring that they feel supported and motivated throughout their language journey.
//   }
