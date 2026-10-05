import {
  get,
  ref,
  query,
  orderByKey,
  limitToFirst,
  startAt,
} from "firebase/database";
import { db } from "./firebase";
import type { Teacher } from "../types/teacher";

export const getTeachers = async (
  startAfterKey?: string,
): Promise<{
  teachers: Teacher[];
  lastKey: string | null;
  hasMore: boolean;
}> => {
  const teachersQuery = query(
    ref(db, "teachers"),
    orderByKey(),
    limitToFirst(startAfterKey ? 6 : 5),
    ...(startAfterKey ? [startAt(startAfterKey)] : []),
  );

  const snapshot = await get(teachersQuery);

  const teachers: Teacher[] = [];

  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.key;
    const data = childSnapshot.val();

    teachers.push({ ...data, id });
  });

  if (startAfterKey) {
    teachers.shift();
  }

  const hasMore = teachers.length > 4;
  const pageTeachers = teachers.slice(0, 4);
  const lastKey = pageTeachers.at(-1)?.id ?? null;

  return {
    teachers: pageTeachers,
    lastKey,
    hasMore,
  };
};

export const getAllTeachers = async (): Promise<Teacher[]> => {
  const snapshot = await get(ref(db, "teachers"));

  const teachers: Teacher[] = [];

  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.key;
    const data = childSnapshot.val();

    teachers.push({
      ...data,
      id,
    });
  });

  return teachers;
};
