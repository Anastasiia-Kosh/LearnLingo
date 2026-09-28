import { useEffect, useState } from "react";
import { getTeachers } from "../../firebase/teachers";
import css from "./TeachersPage.module.css";
import type { Teacher } from "../../types/teacher";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    const loadTeachers = async () => {
      const data = await getTeachers();
      setTeachers(data);
    };

    loadTeachers();
  }, []);

  return (
    <main className={css.page}>
      <div className="container">
        <p>Фільтр</p>
        <ul className={css.teacherList}>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
