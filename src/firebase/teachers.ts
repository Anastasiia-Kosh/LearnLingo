import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { db } from "./firebase";
import type { Teacher } from "../types/teacher";

export const getTeachers = async (
  page: number,
  perPage: number,
): Promise<Teacher[]> => {
  const start = (page - 1) * perPage;
  const teachersRef = ref(db, "teachers");
  const teachersQuery = query(
    teachersRef,
    orderByKey(),
    startAt(String(start)),
    limitToFirst(perPage),
  );
console.log("page:", page);
console.log("start:", start);
  const snapshot = await get(teachersQuery);

  const teachers: Teacher[] = [];

  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.key;
    const data = childSnapshot.val();
    teachers.push({ ...data, id });
  });
  return teachers;
};

