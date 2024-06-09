export interface courseInterface {
  id: string | number;
  name: string;
  description: string;
  img: string;
  questions: Question[];
  teacherId: string;
}

export interface studentInterface {
  id: string;
  name: string;
  email: string;
  courses: string[];
  gender: string;
  dob: string;
  teacherId: string;
}
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}
export interface CourseQuiz {
  id: number;
  name: string;
  questions: Question[];
}
export interface SelectedAnswers {
  [key: number]: string;
}
export interface studentInterface {
  id: string;
  name: string;
  courses: string[];
  gender: string;
  dob: string;
  teacherId: string;
}
