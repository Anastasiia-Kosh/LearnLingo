import { get, ref } from "firebase/database";
import { db } from "./firebase";
import type { Teacher } from "../types/teacher";

export const getTeachers = async ():Promise<Teacher[]> => {
  const teachersRef = ref(db, "teachers");
    const snapshot = await get(teachersRef);

    const teachers: Teacher[] = [];
    
    snapshot.forEach((childSnapshot) => {
        const id = childSnapshot.key;
        const data = childSnapshot.val();
        teachers.push({ ...data, id });
    })
  return teachers;
};
